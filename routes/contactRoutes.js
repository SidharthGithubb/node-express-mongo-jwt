const express=require('express');
const { getAllContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');
router=express.Router();

router.use(validateToken);
router.get("/",getAllContacts);

router.get("/:id",getContactById);

router.post("/",createContact);

router.put("/:id",updateContact)

router.delete("/:id",deleteContact)


module.exports=router;