const test = require('ava');
const { connection, errorHandler } = require('./setup');

const categories = require('../categories')({ connection, errorHandler });

test.beforeEach(() => connection.query('Truncate Table categories'));
test.after.always(() => connection.query('Truncate Table categories'));
const create = () => categories.save('category-test');
test('listar categorias', async (t) => {
  t.plan(2);
  await create();
  
  const list = await categories.all();
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
