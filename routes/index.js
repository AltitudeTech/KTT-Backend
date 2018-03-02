/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone');
const middleware = require('./middleware');
//const importRoutes = keystone.importer(__dirname);
const cors = require('cors');

const schema = require('../graphql/schema-compose');
//const schema ={};
const graphql = require('graphql');
const bodyParser = require('body-parser');
const graphqlExpress = require('graphql-server-express').graphqlExpress;
const graphiqlExpress = require('graphql-server-express').graphiqlExpress;
const jwt = require('express-jwt');

const User = keystone.list('User').model;
//const JWT_SECRET = require('../config').JWT_SECRET;

if (process.env.NODE_ENV == 'development') {
	// Common Middleware
	keystone.pre('routes', middleware.initLocals);
	keystone.pre('render', middleware.flashMessages);
}

// Import Route Controllers
/*const routes = {
	views: importRoutes('./views'),
};*/

// Setup Route Bindings
exports = module.exports = function (app) {
	app.graphqlSchema = schema;

	//Configure CORS -- Remove localhost in final version
	var whitelist = ['http://ktt-app.herokuapp.com', 'http://localhost']
	var corsOptions = {
	  origin: function (origin, callback) {
	    if (whitelist.indexOf(origin) !== -1) {
	      callback(null, true)
	    } else {
	      callback(new Error('Not allowed by CORS'))
	    }
	  }
	}

	//app.use(cors());
	//
	// Register API middleware
	// -------------------------------------------------------------------------
	//NO JWT
	//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
	//enable cors and jwt middleware on api route
	//app.use('/graphql', cors(corsOptions), bodyParser.json(), jwt({
	app.use('/graphql', cors(), bodyParser.json(), jwt({
	  secret: process.env.JWT_SECRET,
	  credentialsRequired: false,
	}), graphqlExpress(req => {
		//req.user is provided by jwt from the authorization header provided
		//User.findOne({ _id: req.user._id, version: req.user.version}).then((user)=>console.log(user))
		//req.user ? console.log(req.user) : console.log('no user present')
		return ({
		  schema: schema,
		  context: {
		    user: req.user ?
		      User.findOne({ _id: req.user._id || req.user.id, version: req.user.version}) : Promise.resolve(null),
		  },
		})}
	));
	app.use('/graphiql', graphiqlExpress({
			endpointURL: '/graphql'
	}));
	// Views
	app.get('/admin', (req, res) => {res.redirect('/keystone')});
	//app.get('/', routes.views.index);
	app.get('/', (req, res) => {res.redirect('/keystone')});

	//routes for testing in development
	if (process.env.NODE_ENV == 'development') {
		/*app.all('/test', routes.views.tests.test);
		app.get('/blog/:category?', routes.views.blog);
		app.get('/blog/post/:post', routes.views.post);
		app.get('/gallery', routes.views.gallery);
		app.all('/contact', routes.views.contact);*/
	}

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
