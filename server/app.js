const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

const routes = require('./routes.js');
const businessRoutes = require('./routes/businessRoutes');
const memberRoutes = require('./routes/memberRoutes');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const messageRoutes = require('./routes/messageRoutes');
const db = require("./models");
const listingCategories = require('./controllers/listingCategoryController');
const listingSubcategories = require('./controllers/listingSubcategoryController');
const { DEVELOPMENT } = require('./constants/environmentConstants');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
// Serve static files that are in the public folder
app.use(express.static(__dirname + '/public'));

if (process.env.NODE_ENV === DEVELOPMENT || !process.env.NODE_ENV) {
    const corsOptions = {
        origin: 'http://localhost:3002',
        credentials: true
    }
    app.use(cors(corsOptions));
}

console.log('NODE_ENV: ', process.env.NODE_ENV);

// Sets up the Express app to handle data parsing
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/user', userRoutes);
app.use('/business', businessRoutes);
app.use('/member', memberRoutes);
app.use('/listing', listingRoutes);
app.use('/admin', adminRoutes);
app.use('/message', messageRoutes);
app.use('/', routes);

//load passport strategies
require("./config/passport.js")(passport);


// force false will prevent the database from being cleared everytime the server starts up
db.sequelize.sync({ force: false })
    // populate DB with categories and subcategories
    .then(() => {
        return listingCategories.populateDBWithCategories();
    })
    .then(()=> {
        return listingSubcategories.populateDBWithSubcategories();
    })
    .catch((err) => {
        console.log('error syncing/populating DB: ', err);
    });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log('88: ', app.get('env'));
    // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
