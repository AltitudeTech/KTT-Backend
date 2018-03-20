const { OutletTC, OutletViewerTC } = require('../composers');

module.exports = () => {
  OutletViewerTC.addResolver({
  	kind: 'query',
    name: 'outletAccess',
    type: OutletViewerTC,
    resolve: ({ args, context , sourceUser}) => {
  		console.log('this outlet');
  		//console.log(context.user);
      return { outlet: sourceUser }
    },
  })

  const OutletViewerTCFields = {
  	outlet: OutletTC.getType()
  	//add other exclusive to outlet fields here
  }
  OutletViewerTC.addFields(OutletViewerTCFields);

}
