'use strict';

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello world!'
    }, null, 2),
  };
};
module.exports.funcn = async (event) => {
  //console.log(event)
  var message= 'Hello world!'
  const name = event.pathParameters && event.pathParameters.name  
  if (name !== null){
    message = 'Hello ' + name
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: message,
    }, null, 2),
  };
};