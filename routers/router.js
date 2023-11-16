  const express = require("express");
  const api = require("./api/api");
  const router = express.Router();
  const swaggerJSDoc = require("swagger-jsdoc");
  const swaggerUi = require("swagger-ui-express");



  router.use('/api', api);
  const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: "API For TransactionMonitor",
        version: "1.0.0",
      },
    };
    const options = {
      swaggerDefinition,
      // Paths to files containing OpenAPI definitions
      apis: ['./routers/api/*.js'],
      
    };
    
    const swaggerSpec = swaggerJSDoc(options);

  router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  router.use('/', (req, res) => {
      
  });

  module.exports = router;