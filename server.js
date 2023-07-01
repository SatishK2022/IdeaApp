const express = require('express');
const serverConfig = require('./configs/server.config.js')

const app = express();

// Starting the Server
app.listen(serverConfig.PORT, () => {
    console.log(`Server Started on the port Number ${serverConfig.PORT}`);
})