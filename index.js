"use strict";

var winston = require('winston');
winston.emitErrs = true;

module.exports = {
  error : x => module.exports.l.error(x),
  warn : x => module.exports.l.warn(x),
  info : x => module.exports.l.info(x),
  verbose : x => module.exports.l.verbose(x),
  debug : x => module.exports.l.debug(x),
  silly : x => module.exports.l.silly(x)
};
const deploylogger = () =>  new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      humanReadableUnhandledException: true,
      colorize: true
    })
  ],
  exitOnError: false
});


const testlogger = () => ({
  error : x => console.log(x),
  warn : x => {},//console.log(x),
  info : x => {},//console.log(x),
  verbose : x => {},//console.log(x),
  debug : x => {},//console.log(x),
  silly : x => {},//console.log(x)
});
  /*new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'error',
      handleExceptions: false, // IMPORTANT, OTHERWISE JEST FUCKS UP
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});*/


module.exports.stream = {
  write: function(message, encoding){
    module.exports.info(message);
  }
};

module.exports.dev = () => {
  module.exports.l = deploylogger();
  module.exports.l.transports[1] = new winston.transports.Console({
    level: 'silly',
    handleExceptions: true,
    json: false,
    humanReadableUnhandledException: true,
    colorize: true
  });
};

module.exports.testing = () => {
  module.exports.l = testlogger();
};

module.exports.deploy = () => {
  module.exports.l = deploylogger();
};
