const jwt = require('jsonwebtoken');

// Middleware para autorizar por uma ou mais `roles`
const authorizeRole = (roles) => {
  return (req, res, next) => {
    // Obtém o cabeçalho Authorization e verifica se existe
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(403).json({ message: 'Acesso negado: Token ausente' });
    }

    // Remove "Bearer " do token
    const token = authHeader.replace('Bearer ', '');

    try {
      // Decodifica o token para obter o payload (incluindo o role)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Verifica se o `role` do usuário está na lista de `roles` permitidas
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Acesso negado: Role inválido' });
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
};

module.exports = authorizeRole;
