/*
 * Copyright 2018 Jimmy, Adrien Lecharpentier and others
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
