const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

// using string
// module.exports = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`)