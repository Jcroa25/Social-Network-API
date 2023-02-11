const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for running on port ${PORT}!`);
  });
});
// // Require express and mongoose
// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(express.static('public'));

// app.use(require('./routes'));

// // Connect mongoose
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Log mongoose queries
// mongoose.set('debug', true);

// app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));