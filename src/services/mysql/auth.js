const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const auth = (deps) => {
  return {

    authenticate: (email, password) => {
      return new Promise((resolve, reject) => {
        const queryString = 'SELECT name, email, id from users where email=? and password =?';
        const { connection, errorHandler } = deps;
        connection.query(queryString, [email, sha256(password)], (error, results) => {
          if (error || !results.length) {
            errorHandler(error, 'Falha ao localizar o usuario', reject);
            return false;
          };
          const { id } = results[0];
          const token = jwt.sign({ email, id },process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
          resolve({ token });

        });
      });
    }, 
  }
}

module.exports = auth;