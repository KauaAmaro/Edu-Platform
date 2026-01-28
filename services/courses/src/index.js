const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

// Listar todos os cursos
app.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
});

// Criar curso
app.post('/', async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;
    const course = await prisma.course.create({
      data: { title, description, instructor, price: parseFloat(price) }
    });
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar curso' });
  }
});

// Buscar curso por ID
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({
      where: { id }
    });
    if (!course) {
      return res.status(404).json({ error: 'Curso não encontrado' });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar curso' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'courses' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📚 Courses service rodando na porta ${PORT}`);
});
