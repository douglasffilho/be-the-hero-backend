db = db.getSiblingDB('database');

db.createUser({
  user: 'database',
  pwd: 'password',
  roles: ['readWrite'],
});
