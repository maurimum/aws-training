'use strict';

const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient()


function sendResponse(statusCode, message, callback) {
	const response = {
		statusCode: statusCode,
		body: JSON.stringify(message)
	};
	callback(null, response);
}

module.exports.saveName = async (event,context,callback) => {
  //console.log(event)
  var message= 'Hello world!'
  const name = event.queryStringParameters && event.queryStringParameters.name
  if (name !== null){
    console.log(name)
    message = 'Hello ' + name

    const item ={}
    item.name = name

    const params = {
        TableName: 'greetNames',
        Item: item
    }
    return dynamo.put(params).promise()
    .then(sendResponse(200, message, callback))
    .catch(error => {
      console.log(error);
      sendResponse(500, error, callback);
    });
  }
  else{
    sendResponse(200, message, callback)
  }
}
  
function getNameDynamoDB(name){
    const params = {
    Key: {
      name: name
    },
    TableName: 'greetNames'
  }
  return dynamo.get(params).promise()
      .then(response => {
        return response.Item
      });
}

module.exports.wasGreet = (event,context,callback) => {
  const name = event.queryStringParameters && event.queryStringParameters.name
  
  if (name !== null){
    getNameDynamoDB(name)
      .then(nameDB => {
          if (nameDB !== undefined){
               sendResponse(200, "YES", callback)
          }
          else{
            sendResponse(200, "NO", callback)
          }
    })    
    .catch(error => {
    console.log(error);
    sendResponse(500, error, callback);
    });
  }  
  else{
    sendResponse(400, "Please provide a name to get from DynamoDB", callback)
  }
}
