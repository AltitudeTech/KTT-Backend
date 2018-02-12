const _ = require("lodash");
const { GraphQLSchema } = require("graphql");

module.exports = customBuildSchema = (GQC) => _.bind(function() {
    const roots = {};

    const createdRelations = new Set();

    if (this.has('Query')) {
      const tc = this.get('Query');
      //this.buildRelations(tc, createdRelations);
      this.removeEmptyTypes(tc, new Set());
      roots.query = tc.getType();
    }

    if (this.has('Mutation')) {
      const tc = this.get('Mutation');
      //this.buildRelations(tc, createdRelations);
      this.removeEmptyTypes(tc, new Set());
      roots.mutation = tc.getType();
    }

    if (this.has('Subscription')) {
      const tc = this.get('Subscription');
      //this.buildRelations(tc, createdRelations);
      this.removeEmptyTypes(tc, new Set());
      roots.subscription = tc.getType();
    }

    if (Object.keys(roots).length === 0) {
      throw new Error('Can not build schema. Must be initialized at least one '
      + 'of the following types: RootQuery, RootMutation.');
    }

    return new GraphQLSchema(roots);
}, GQC)();
