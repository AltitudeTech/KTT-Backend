const keystone = require('keystone');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OutletTC } = require('../composers');
const Outlet = keystone.list('Outlet').model;

module.exports = () => {
  OutletTC.addResolver({
    kind: 'query',
    name: 'nextEvent',
    description: 'returns the next Event',
    type: OutletTC,
    resolve: async ({ args, context }) => {
      console.log('outlet login this ----');
      const { username, password } = args;
      console.log(args);
      return Outlet.findOne({username}).then((outlet) => {
        if (outlet) {
          // validate password
					//return user;
          return bcrypt.compare(password, outlet.password).then((res) => {
            if (res) {
              // create jwt
              const token = jwt.sign({
                id: outlet.id,
                email: outlet.email,
                type: 'Outlet',
              }, process.env.JWT_SECRET);
              outlet.jwt = token;
              context.outlet = Promise.resolve(outlet);
              return outlet;
            }
            return Promise.reject('password incorrect');
          });
        }
        return Promise.reject('username not found');
      });
    },
  })
sort: DATE_ASC, filter: {_operators: {date: {gte: "2018-02-17T10:50:05.244Z"}}}
}
