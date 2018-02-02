const test = require('ava');

const { connection, errorHandler } = require('./setup');

const users = require('../users')({ connection, errorHandler });
const auth = require('../auth')({ connection, errorHandler });

test.beforeEach(() => connection.query('Truncate Table users'));
test.after.always(() => connection.query('Truncate Table users'));
const create = () => users.save('user-test', 'test@email.com', 'pas123');

test('Login de usuario-sucesso', async (t) => {
  t.plan(2);
  await create();
  const result = await auth.authenticate('test@email.com','pas123');
  t.not(result.token, null);
  t.not(result.token.length, 0);
});

test('Login de usuario -falha', async (t) => {
  await create();
  const promise = auth.authenticate('test@email.com','pass3');
  const error = await t.throws(promise);
  t.is(error.error, 'Falha ao localizar o usuario');
})