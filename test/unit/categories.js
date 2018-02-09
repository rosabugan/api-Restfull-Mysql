const { expect } = require('chai');

const { connection, errorHandler } = require('../../src/services/mysql/conection');
const categories = require('../../src/services/mysql/categories')({ connection, errorHandler });

connection.query = (sql, param, callback = param) => {
  let response;
  let err;
  switch (sql) {
    case 'SELECT * from categories':
      response = { name: 'category-test', id: 1 };
      break;

    case 'SELECT * from categories where id = ?':
      if (param[0] === 1) {
        response = { name: 'category-test', id: param[0] };
      } else { err = { error: 'não foi posivel executar a query' }; }
      break;

    case 'INSERT INTO categories (name) values (?)':
      if (typeof (param[0]) === 'string') {
        response = { name: param[0], insertId: 1, affectedRows: 1 }
      } else { err = { error: 'não foi posivel executar a query' } };
      break;
    case 'UPDATE categories set name = ? where id = ?':
    case 'DELETE FROM categories where id=?':
      response = { affectedRows: 1, id: param[0] };
      break;

    default:
      err = { error: 'não foi posivel executar a query' };
      break;
  }
  if (typeof callback === 'function') {
    callback(err, response);
  }
};

describe('smoke Tests', () => {
  it('is categories.all a function', () => {
    expect(typeof categories.all).to.be.equal('function');
  });

  it('categories.all return a object', async () => {
    const categ = await categories.all();
    expect(typeof categ).to.be.equal('object');
  });
});

describe('happy way', () => {
  describe('categories.all return a mock object', () => {
    it('categories.name is equal category', async () => {

      const categ = await categories.all();
      expect(categ.categories.name).to.be.equal('category-test');
    })
  })

  describe('categories.save return a mock object', () => {
    it('categories.name is equal new category', async () => {

      const categ = await categories.save('category-test');
      expect(categ.category.name).to.be.equal('category-test');
    })
  })

  describe('categories.update return a mock object', () => {
    it('categories.affectedRows is equal 1', async () => {

      const categ = await categories.update(1, 'category');

      expect(categ.affectedRows).to.be.equal(1);
    })
  })

  describe('categories.del return a mock object', () => {
    it('affectedRows is equal 1', async () => {

      const categ = await categories.del(1);

      expect(categ.affectedRows).to.be.equal(1);
    })
  })
})
describe('bad way', () => {
  describe('categories.save', () => {
    it('should be break if not recive parameters ', async () => {

      const categ = await categories.save();

      expect(categ).to.be.a('error');
    })
  })
})
