/**
 * This script automatically creates the nigerian states and local governmennts
 * when an empty database is used for the first time. You can use this
 */

var keystone = require('keystone');
var async = require('async');
var State = keystone.list('State');
var LocalGovernment = keystone.list('LocalGovernment');

const states = require('./data/nigeria-states');

let createState = (state, done)=>{
	let ids = []
	let stateName = state.state.name;

	state.state.locals.forEach((local)=>{
		let newLocalGovernment = new LocalGovernment.model({name: local.name});
		newLocalGovernment.save(function (err, localGov) {
			if (err) {
				console.error('Error adding lG: ' + dataItem.name + ' to the database:');
				console.error(err);
			} else {
				ids.push(localGov._id);
				if (ids.length === state.state.locals.length) {
		 	 		let newState = new State.model({name: stateName, locals: ids});
					newState.save((err)=>{
						if (err) {
							console.log(err);
						} else {
							done(err);
						}
					})
		 	 	}
			}
		})
	})
}

exports = module.exports = function (done) {
	async.forEach(states, createState, done);
};
