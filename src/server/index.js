import WebServer from './web.server'

let webServer = new WebServer();

// webServer.conectDb()
//   .then(() => {
//     console.log('Database connection established!')
//     //MOVE START() HERE AFTER CONNECTDB() STARTS TO WORK
//   })
//   .catch(err => {
//     console.log('Failed to establish connection with database.')
//   });

webServer.start()
  .then(() => {
    console.log('Web server started!')
  })
  .catch(err => {
    console.error(err)
    console.error('Failed to start web server')
  });