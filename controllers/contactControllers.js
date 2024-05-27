const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModule"); // Ensure the file name is correct

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts); // Return the found contacts
});

//@desc Create a contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log('The data parsed is', req.body);
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const contact = await Contact.create({ name, email, phone, address, user_id: req.user.id });
    res.status(201).json(contact);
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    console.log('The data parsed is', req.params.id);
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to update this contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedContact);
});

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!== req.user.id) {
        res.status(401);
        throw new Error("Not authorized to delete this contact");
    }
    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };
