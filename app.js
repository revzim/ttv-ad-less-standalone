
const express = require('express');
const app = express();

async function init(cb) {
  app.use('/public', express.static(`${__dirname}/public`));
  
  app.get("/ttv/:streamer", (req, res) =>{
    res.setHeader("streamer", req.params.streamer);
    res.sendFile(`${__dirname}/public/ttv.html`);
  });

  const exit_events = [
    "beforeExit",
    "exit",
    "SIGTERM",
    "SIGINT",
  ];
  
  exit_events.forEach(ev=>{
    process.on(ev, (code) => {
      console.log(`PROCESS ${ev} | CODE: ${code}`);
      process.exit(0);
    });
  });
  try {
    app.listen(SETTINGS.port, () => {
      SETTINGS.app = app;
      console.log(`TTV-AD-LESS: http://${SETTINGS.host}:${SETTINGS.port}/ttv/:streamer`);
    });
  } catch(e) {
    console.log(e);
    cb({
      error: err,
      data: {}
    });
    // console.log("addr already in use");
  }
  
}

const SETTINGS = {
  host: 'localhost',
  port: 8085,
  init: init,
};

SETTINGS.init()

module.exports = SETTINGS