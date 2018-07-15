import express from 'express';
import mysql from 'mysql';

export default class WebServer {
  constructor () {
    this.app = express(),
    this.app.use(express.static('dist/public')),
    this.db = mysql.createConnection({
      host: "localhost",
      user: "yourusername",
      password: "yourpassword"
    });
  }
  start () {
    return new Promise((resolve, reject) => {
      try {
        console.log(this.server);
        this.server = this.app.listen(3000, function () {
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
        reject(error)
      }
    })
  }
  // conectDb () {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       this.db.connect(() => resolve());
  //     } catch (error) {
  //       console.error(error.message);
  //       reject();
  //     }
  //   })
  // }
}