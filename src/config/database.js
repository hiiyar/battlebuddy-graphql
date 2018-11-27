
const database = {
  mongodb: {
    host: process.env.DB_HOST || 'mongodb://142.93.9.54',
    port: process.env.DB_PORT || '27017',
    name: process.env.DB_NAME || 'battlebuddy',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
  }
}

module.exports.connectionString = (dbname) => {
  switch(dbname){
    case 'mongodb':
      return `${database.mongodb.host}:${database.mongodb.port}/${database.mongodb.name}`;
    default:
      return `${database.mongodb.host}:${database.mongodb.port}/${database.mongodb.name}`;
  }
}