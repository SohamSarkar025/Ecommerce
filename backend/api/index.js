const serverless = require("serverless-http");
const app = require("../server");

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  const response = await handler(event, context);

  // Inject CORS headers
  response.headers = {
    ...response.headers,
    "Access-Control-Allow-Origin": "https://ecommerce-4acy.vercel.app", // your frontend domain
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: response.headers,
      body: "",
    };
  }

  return response;
};
