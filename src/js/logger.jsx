import loglevel from 'loglevel';

var originalFactory = loglevel.methodFactory;

function logWithLoggerName(methodName, logLevel, loggerName) {
  var rawMethod = originalFactory(methodName, logLevel, loggerName);

  return function () {
    var args = [];
    if(loggerName) args.push("[" + loggerName + "]");
    args.push(methodName.toUpperCase() + ":");

    for (var l = arguments.length, i = 0; i < l; i++) {
      args.push(arguments[i]);
    }
    rawMethod.apply(loglevel, args);
  };
}

loglevel.methodFactory = logWithLoggerName;

// set the global log level here
const DEVMODE = true;

if(DEVMODE) {
  loglevel.setLevel('trace');
} else {
  loglevel.setLevel('error');
}

export default loglevel;
