const express = require('express');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const app = express();

const BUILD_DIR = `dist`;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'
const PORT = process.env.PORT || 4000

app.use(express.static(BUILD_DIR));
app.use(compression());
app.use('/api', proxy({ target: BACKEND_URL, changeOrigin: true }));

app.get('/*', function (request, response) {
  response.sendFile('index.html', { root: BUILD_DIR });
})

app.listen(PORT, function () {
  console.log(`started on port ${PORT}`)
});
