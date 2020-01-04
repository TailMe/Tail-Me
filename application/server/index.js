const express = require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const configs = require('./config');
// const Walkers = require('./services/Walkers');
// const routes = require('./routes');
// const helpers = require('./lib/helpers');
const PORT = process.env.PORT || 3080;

const app = express();

const config = configs[app.get('env')];
const log = config.log();

// const walkers = new Walkers(config);

app.use(express.static('public'));

const hbs = exphbs.create({
    // helpers: helpers
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

if (app.get('env') === 'development') {
    app.locals.pretty = true;
}
app.locals.siteTitle = config.sitename;


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.get('/', (req, res) => {
    res.render('home');
});

// app.use('/', routes({
//     walkers
// }));

app.use((req, res, next) => next(createError(404, 'File not found')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500;
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    return res.render('error', { layout: 'alternate' });
});

app.listen(PORT, () => {
    log.info(
        `Main application listening on port ${PORT} in ${app.get('env')} mode.`,
    );
});

module.export = app;
