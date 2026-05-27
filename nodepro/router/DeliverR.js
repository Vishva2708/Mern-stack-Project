const express = require("express");

const {
  deliveryregister,
  deliverylogin,
  getpendingrequest,
  approvalpartner,
  rejectedrequest,
} = require("../controller/deliver");

const E_route = express.Router();

E_route.post("/deliver-register", deliveryregister);

E_route.post("/login", deliverylogin);

E_route.get("/partners", getpendingrequest);

E_route.put("/approve/:id", approvalpartner);

E_route.put("/reject/:id", rejectedrequest);

module.exports = E_route;
