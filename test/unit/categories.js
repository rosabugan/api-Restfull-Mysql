const { expect } = require('chai');
const sinon = require('sinon');

let response;
beforeEach(() => { response = '' });
const deps = {
  connection: {
    query: (Query, param) => {
      switch (Query) {
        case 'SELECT * from categories':
          response = { name: 'category-test', _id: 1 };
          break;

        case 'INSERT INTO categories (name) values (?)':
          response = { name: param[0], insertId: 1, affectedRows: 1 }
          break;

        case 'UPDATE categories set name = ? where id = ?':
        case 'DELETE FROM categories where id=?':
          response = { affectedRows: 1, id: param[0] };
          break;

        default:
          response = { error: 'não foi posivel executar a query' };
      }

      return response;


    },

    errorHandler: (err, msg, reject) => {

      reject({ error: msg });
    }
  }

}

const categories = require('../../src/services/mysql/categories')(deps);
describe('smoke Tests', () => {
  it('is categories.all a function', () => {
    expect(typeof categories.all).to.be.equal('function');
  });

  it('categories.all return a object', () => {
    const categ = categories.all();
    expect(typeof categ).to.be.equal('object');
  });
});

describe('happy way', () => {
  describe('categories.all return a mock object', () => {
    it('categories.name is equal category', () => {

      categories.all();
      expect(response.name).to.be.equal('category-test');
    })
  })

  describe('categories.save return a mock object', () => {
    it('categories.name is equal new category', async () => {

      await categories.save('teste');
      expect(response.name).to.be.equal('teste');
    })
  })

  describe('categories.update return a mock object', () => {
    it('categories.affectedRows is equal 1', () => {

      categories.update(1, 'category');

      expect(response.affectedRows).to.be.equal(1);
    })
  })

  describe('categories.del return a mock object', () => {
    it('affectedRows is equal 1', () => {

      categories.del(1);

      expect(response.affectedRows).to.be.equal(1);
    })
  })
})
