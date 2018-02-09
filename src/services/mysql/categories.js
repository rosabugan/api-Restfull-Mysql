const categories = ({ connection, errorHandler }) => {
  return {
    all: () => new Promise((resolve, reject) => {
      connection.query('SELECT * from categories', (error, results) => {
        if (error) {
          errorHandler(error, 'Falha ao listar as categorias', reject);
          return false;
        }
        resolve({ categories: results });
      });
    }),
    save: (name) => {
      return new Promise((resolve, reject) => {
        connection.query('INSERT INTO categories (name) values (?)', [name], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao salvar a categoria ${name}`, reject);
            return false;
          };
          resolve({ category: { name, id: results.insertId } });

        })
      });
    },
    update: (id, name) => {
      return new Promise((resolve, reject) => {
        connection.query('UPDATE categories set name = ? where id = ?', [name, id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao atualizar a categorias ${name}`, reject);
            return false;
          };
          resolve({ category: { name, id }, affectedRows: results.affectedRows });

        });
      });
    },
    del: (id) => {
      return new Promise((resolve, reject) => {
        connection.query('DELETE FROM categories where id=?', [id], (error, results) => {
          if (error) {
            errorHandler(error, `Falha ao deletar a categorias ${id}`, reject);
            return false;
          };
          resolve({ message: 'Categoria removiada com sucesso', affectedRows: results.affectedRows });

        });
      });
    }

  }
}

module.exports = categories;