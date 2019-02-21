const meta = {};
meta.resource = {};
meta.resource.title = 'Tasks';
meta.prefix = `->`;

console.info(`${meta.resource.title}: Loading resource...`);
console.info(`${meta.prefix} Importing dependencies...`);

const express = require("express");
const router = express.Router();
const controller = require("./controller");

console.info(`${meta.prefix} ...imported dependencies.`);

router.post("/api", controller.create.one);

router.get("/api", controller.read.all);
router.get("/api/:id", controller.read.one);

router.put("/api/:id", controller.update.one);

router.delete("/api/:id", controller.delete.one);

console.info(`${meta.resource.title}: ...Loaded resource.`);

module.exports = router;
