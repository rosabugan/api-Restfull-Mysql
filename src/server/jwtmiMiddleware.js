const jwt = require('jsonwebtoken');

const jwtMiddleware = (exclusions) => {
  return async (req, res, next) => {
    
    if (!exclusions.includes(req.href())) {

      const token = req.headers['x-access-token'];
      if (!token) {
        res.send(403, { error: 'Token não fornecido' });
        return false;
      }
      try {
        req.decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        res.send(403, { error: 'Erro ao validar o Token' });
        return false;
      }
      
    }
    next();
  }
}

module.exports = jwtMiddleware;
