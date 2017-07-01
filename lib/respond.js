
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export function fail(error, callback) {
  const response = {
    statusCode: 500,
    headers: headers,
    body: JSON.stringify({status: false, error: error}),
  };
  callback(null, response);
}

export function succeed(payload, callback) {
  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(payload),
  }
  callback(null, response);
}