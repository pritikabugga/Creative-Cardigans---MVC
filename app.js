const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const cardiganRoutes = require('./routes/cardiganRoutes');

const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Ensure static files are served
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Set up the root route to render the homepage
app.get('/', (req, res) => {
    res.render('index'); // Ensure you have views/index.ejs
});

app.use('/items', cardiganRoutes);

// Error Handling
app.use((req, res, next) => {
    let err = new Error(`The server cannot locate ${req.url}`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500);
    res.render('error', { error: err });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
