const test = require('ava');
const sha256 = require('sha256');
const { connection, errorHandler } = require('./setup');

const users = require('../users')({ connection, errorHandler });

test.beforeEach(() => connection.query('Truncate Table users'));
test.after.always(() => connection.query('Truncate Table users'));
const create = () => users.save('user-test', 'test@email.com', 'pas123');

test('listar usuarios', async (t) => {
  t.plan(2);
  await create();
  const list = await users.all();
  t.is(list.users[0].name, 'user-test');
  t.is(list.users.length, 1);
});

test('criação de usuario', async (t) => {
  t.plan(1);
  const result = await create();
  t.is(result.user.name, 'user-test');
});

test('alterar usuario', async (t) => {
  t.plan(2);
  await create();
  const updated = await users.update(1, 'usuario');
  t.is(updated.affectedRows, 1);
  t.is(updated.user.senha, sha256('usuario'));
});

test('excluir usuario', async (t) => {
  t.plan(2);
  await create();
  const result = await users.del(1);
  t.is(result.affectedRows, 1);
  t.is(result.message, 'usuario removiado com sucesso');
});
