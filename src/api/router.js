const express = require("express"),
    router = express.Router(),
    controller = require("./controller");
    
router
  .route("/")
    .get(
        controller.details
    );
  
router
  .route("/validate-rule")
    .post(
        controller.validateRule
    );
    
module.exports = router;