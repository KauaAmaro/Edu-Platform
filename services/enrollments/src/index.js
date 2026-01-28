const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4003;

app.use(cors());

// Middleware personalizado para capturar erros de JSON
app.use(express.json({ strict: false }));

// Tratamento global de erros de parsing
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error('Erro de parsing JSON:', error.message);
    return res.status(400).json({ error: 'JSON inválido na requisição' });
  }
  next();
});

// Listar inscrições de um usuário
app.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: 'userId é obrigatório' });
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { userId }
    });
    res.json(enrollments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar inscrições' });
  }
});

// Criar inscrição
app.post('/', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      return res.status(400).json({ error: 'userId e courseId são obrigatórios' });
    }

    const enrollment = await prisma.enrollment.create({
      data: { userId, courseId }
    });
    res.status(201).json(enrollment);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Usuário já inscrito neste curso' });
    }
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar inscrição' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'enrollments' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📝 Enrollments service rodando na porta ${PORT}`);
});