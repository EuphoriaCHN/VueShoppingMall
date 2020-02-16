module.exports = {
  protocol: 'mongodb://',
  host: '127.0.0.1:27017/',
  database: 'shopping_mall',
  username: '',
  password: '',
  identity () {
    return this.username === '' ? '' : `${this.username}:${this.password}@`;
  },
  getConnectionURL () {
    return `${this.protocol}${this.identity()}${this.host}${this.database}`;
  }
};
