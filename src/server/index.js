import WebServer from './web.server'

let webServer = new WebServer();

webServer.start()
  .then(() => {
    console.log('Web server started!')
  })
  .catch(error => {
    console.error(error)
    console.error('Failed to start web server')
  });

webServer.connectDb()
  .then(() => {
    console.log('Database connection established!')
  })
  .catch(error => {
    console.log('Failed to establish connection with database.', error)
  });
  
  webServer.createUser()

