const mongoose = require('mongoose');

const contactSchema = mongoose.Schema ({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User is required!"]
    },
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email address is required!"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required!!"]
    },
    address: {
        type: String,
        required: [true, "Address is required!"]
    },
    
},   {
    timestamps: true,
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;