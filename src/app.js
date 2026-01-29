const express = require('express');
const routes = require('./routes');

const app = express();

// JSON middleware
app.use(express.json());

// Routes
app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
