/**
* FUNCTIONS
*/
module.exports.toCamelCase = (s) => s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

/*
* REGEX
*/
module.exports.PHONE_REGEX = new RegExp("^[0][0-9]\\d{9}$");
module.exports.NOT_PASSWORD_REGEX = new RegExp("^(.{0,7}|[^0-9]*|[^a-z]*)$");

/**
* CONSTANTS
*/
module.exports.MONTHS = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"]

module.exports.CANDIDATE_CATEGORIES = ['seeker','startup','employed']

module.exports.GENDERS = ['Male','Female','Other']

module.exports.STATES = [
  "Abia",
  "Adamawa",
  "Anambra",
  "AkwaIbom",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "CrossRiver",
  "Delta",
  "Ebonyi",
  "Enugu",
  "Edo",
  "Ekiti",
  "FCTAbuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
]
