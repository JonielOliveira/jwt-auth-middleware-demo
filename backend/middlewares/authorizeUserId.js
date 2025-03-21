const jwt = require('jsonwebtoken');

// Middleware para autorizar com base no userId
const authorizeUserId = (req, res, next) => {
  try {
    // Obtém o cabeçalho Authorization e verifica se existe
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(403).json({ message: 'Acesso negado: Token ausente' });
    }

    // Remove "Bearer " do token
    const token = authHeader.replace('Bearer ', '');

    // Decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o userId do token corresponde ao userId da rota
    if (String(decoded.userId) !== String(req.params.userId)) {
      return res.status(403).json({ message: 'Acesso negado: Usuário inválido' });
    }

    // Armazena o payload decodificado no request e prossegue
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    res.status(400).json({ message: 'Token inválido' });
  }
};

module.exports = authorizeUserId;
