const db = require('../services/mysql');

const routes = (server) => {
  server.get('categoria', async (req, res, next) => {
    try {
      res.send(await db.categories().all());
     
    } catch (err) {
      res.send(err);  
    }
    next();
  });

  server.post('categoria', async (req, res, next) => {
    const { name } = req.params;
    try {
      res.send(await db.categories().save(name));
    } catch (err) {
      res.send(err);     
    } 
    next();
  });

  server.put('categoria', async (req, res, next) => {
    const { id, name } = req.params;
    try {
      res.send(await db.categories().update(id, name));
      
    } catch (err) {
      res.send(err);  
     
    } 
    next();
  });

  server.del('categoria', async (req, res, next) => {
    const { id } = req.params;
    try {
      res.send(await db.categories().del(id));
     
    } catch (err) {
      res.send(err);  
      
    }
    next();
  });
  server.get('usuario', async (req, res, next) => {
    try {
      res.send(await db.users().all());
     
    } catch (err) {
      res.send(err);  
    }
    next();
  });

  server.post('usuario', async (req, res, next) => {
    const { name, email, password } = req.params;
    try {
      res.send(await db.users().save(name, email, password));
    } catch (err) {
      res.send(err);     
    } 
    next();
  });

  server.put('usuario', async (req, res, next) => {
    const { id, password } = req.params;
    try {
      res.send(await db.users().update(id, password));
      
    } catch (err) {
      res.send(err);  
     
    } 
    next();
  });

  server.del('usuario', async (req, res, next) => {
    const { id } = req.params;
    try {
      res.send(await db.users().del(id));
     
    } catch (err) {
      res.send(err);  
      
    }
    next();
  });

  server.post('auth', async (req, res, next) => {
    const { email, password } = req.params;
    try {
      res.send(await db.auth().authenticate(email, password));
    } catch (err) {
      res.send(err);     
    } 
    next();
  });
  server.get('/', (req, res, next) => {
    res.send('Enjoy the silence...');
    next();
  });


};
module.exports = routes;