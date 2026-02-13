const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const app = express();

//  Nova forma para Prisma v7+
const prisma = new PrismaClient(); 

const PORT = process.env.PORT || 4001;
const JWT_SECRET = process.env.JWT_SECRET || 'edu_jwt_secret_2026';

app.use(cors());
app.use(express.json());


// Função de retry para conexão com PostgreSQL
const connectWithRetry = async () => {
  let retries = 10; // Aumentado de 5 para 10
  while (retries) {
    try {
      await prisma.$connect();
      console.log('Auth service conectado ao PostgreSQL');
      return;
    } catch (err) {
      console.log(` Tentativa ${11 - retries}/10: Falha ao conectar ao PostgreSQL...`);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000)); // Espera 5 segundos
    }
  }
  throw new Error('Falha ao conectar ao PostgreSQL após 10 tentativas');
};

// Registro
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    const hashed = await bcrypt.hash(password, 12);
    
 
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });
    
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    console.error('Erro no registro:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'auth' });
});

// Tratamento de erros globais
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Iniciar conexão e servidor
connectWithRetry().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(` Auth service rodando na porta ${PORT}`);
  });
});
