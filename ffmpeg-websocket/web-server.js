const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

function coi(req, res, next) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
}

app.use(cors());
app.use(coi);

app.use('/', express.static(path.resolve(__dirname, './')));

module.exports = app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
