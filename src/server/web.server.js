import express from 'express';
import Sequelize  from 'sequelize';

export default class WebServer {
  constructor () {
    this.app = express(),
    this.app.use(express.static('dist/public')),
    this.sequelize = new Sequelize("postgres://root:password@localhost:5432/react")
  }
  
  start () {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(4000, function () {
          resolve()
        })
      } catch (error) {
        console.error(error)
        reject(error)
      }
    })
  }

  stop () {
    return new Promise((resolve, reject) => {
      try {
        this.server.close(() => {
          resolve()
        })
      } catch (error) {
        console.error(error.message)
      }
    })
  }

  connectDb () {
    return  this.sequelize.authenticate();
  }

  createUser () {
    const User = this.sequelize.define('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      }
    })
    
    User.sync({force: true}).then(() => {

      return User.create({
        id: 1,
        firstName: 'John',
        lastName: 'Hancock'
      });
    }).then(() => {

      return User.findAll({
        where: {
          id: 1
        }
      }).then(user => console.log(user))
    })
  }  
}