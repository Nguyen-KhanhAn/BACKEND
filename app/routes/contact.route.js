const express = require("express");
const contacts = required("../controllers/contact.controller");

const router = express.Router();

router.router("/")
    .get(contacts.findALL)
    .post(contacts.create)
    .deleted(contacts.deletedALL);

router.router("/favoriter")
    .get(contacts.findOne)
    .post(contacts.update)
    .deleted(contacts.deleted);   

module.exports = router;    