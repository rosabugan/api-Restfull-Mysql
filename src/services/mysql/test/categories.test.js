const test = require('ava');
//const { connection, errorHandler } = require('./setup');
let response;
test.beforeEach(()=>{response=''});

const  connection= {
    query: (Query, param, _callback) => {
      if(typeof param === 'function'){
        _callback =  param;
      }
      switch (Query) {
        case 'SELECT * from categories':
          return response = {name: 'category-test', _id: 1 };

        case 'INSERT INTO categories (name) values (?)':
          return response = { name: param[0], insertId: 1, affectedRows: 1 };

        case 'UPDATE categories set name = ? where id = ?':
        case 'DELETE FROM categories where id=?':
          return response = { affectedRows: 1 }

        default:
          return err = { error: 'não foi posivel executar a query' };
      }
      if(typeof _callback === 'function'){
        _callback(err,response);
      }
    }
  };

const errorHandler= (err, msg, reject) => {

      reject({ error: msg });
 
}

const categories = require('../categories')({connection, errorHandler});

// test.beforeEach(() => connection.query('Truncate Table categories'));
// test.after.always(() => connection.query('Truncate Table categories'));
const create = () => categories.save('category-test');
test('listar categorias', async (t) => {
  t.plan(2);
  await create();

  const list = await categories.all();
  console.log(list);
  t.is(list.categories[0].name, 'category-test');
  t.is(list.categories.length, 1);
});

test('criação de categoria', async (t) => {
  t.plan(1);
  const result = await create();
  t.is(result.category.name, 'category-test');
});

test('alterar categoria', async (t) => {
  t.plan(2);
  await create();
  const updated = await categories.update(1, 'categoria');
  t.is(updated.affectedRows, 1);
  t.is(updated.category.name, 'categoria');
});

test('excluir categoria', async (t) => {
  t.plan(2);
  await create();
  const result = await categories.del(1);
  t.is(result.affectedRows, 1);
  t.is(result.message, 'Categoria removiada com sucesso');
});
