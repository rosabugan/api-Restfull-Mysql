const sha256 = require('sha256');
//const { connection, errorHandler } = require('./conection');

const users = ({ connection, errorHandler }) => {
  return {

    all: () => {
      return new Promise((resolve, reject) => {

        
        connection.query('SELECT name, email, id from users', (error, results) => {
          if (error) {
            errorHandler(error, 'Falha ao listar as usuarios', reject);
            return false;
          };
          resolve({ users: results });

        });
      });
    },
    save: (name, email, password) => {
      return new Promise((resolve, reject) => {
        const senha = sha256(password);
        connection.query('INSERT INTO users (name, email, password) values (?,?,?)', [name, email, senha], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar a usuario ${email}`, reject);
            return false;
          };
          resolve({ user: { id: results.insertId, name, email } });

        });
      });
    },
    update: (id, password) => {
      return new Promise((resolve, reject) => {
        const senha = sha256(password);
        const { connection, errorHandler } = deps;
        connection.query('UPDATE users set password = ? where id = ?', [senha, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar o usuario ${id}`, reject);
            return false;
          };
          resolve({ user: { senha, id }, affectedRows: results.affectedRows });

        });
      });
    },
    del: (id) => {
      return new Promise((resolve, reject) => {

        const { connection, errorHandler } = deps;
        connection.query('DELETE FROM users where id=?', [id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao deletar o usuario ${id}`, reject);
            return false;
          };
          resolve({ message: 'usuario removiado com sucesso', affectedRows: results.affectedRows });

        });
      });
    }

  }
}

module.exports = users;