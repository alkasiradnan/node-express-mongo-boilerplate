const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');
const { ErrorHandler, ConvertError, NotFound } = require('../middleware/error');

/**
 * Instantiate Express Framwork
 * @public
 */
const app = express();

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  );
  next();
});

// Mount BodyParser middleware will append body of request to req.body
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10kb' }));

// Static assets directory setup
app.use(express.static(path.join(__dirname, '../public')));

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Get API Documentation
app.use('/docs', express.static('docs'));

// Get Code Coverage report
app.use('/coverage', express.static('coverage'));

// Mounting api routing
// app.use('/api/v1', require('../api/routes'));
require('../route')(app);

// testing url
app.get('/', (req, res) => {
  res.json({ message: 'Message to test' });
});

// Error handler, send stacktrace only during development
// app.use(ErrorHandler);
app.use(ConvertError);

// Catch 404 and forward to error handler
app.use(NotFound);

// Error handler, send stacktrace only during development
app.use(ErrorHandler);

module.exports = app;
