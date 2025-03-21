const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authorizeUserId = require('./middlewares/authorizeUserId');
const authorizeRole = require('./middlewares/authorizeRole');

dotenv.config();

const app = express();
app.use(express.json());

// Função para criar um token de exemplo
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Rota pública para gerar token de exemplo
app.post('/login', (req, res) => {
  const { userId, role } = req.body;
  const token = generateToken(userId, role);
  res.json({ token });
});

// Rota privada para usuários com base no `userId` (usando `authorizeUserId`)
app.get('/user/:userId', authorizeUserId, (req, res) => {
  res.json({ message: `Acesso autorizado, usuário ${req.user.userId}` });
});

// Rota privada para verificar roles (usando `authorizeRole`)
app.get('/admin', authorizeRole(['admin', 'superadmin']), (req, res) => {
  res.json({ message: 'Acesso autorizado: Role correta' });
});

app.get('/userRole/:userId', authorizeUserId, authorizeRole(['admin']), (req, res) => {
  res.json({ message: `Acesso autorizado para admin do usuário ${req.user.userId}` });
});

// Inicia o servidor
const port = process.env.BACKEND_PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
