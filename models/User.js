const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter valid email"]
    },

    address: {
        street: { type: String, required: true },
        suite: { type: String, required: true },
        city: {
            type: String,
            required: true,
            match: [/^[A-Za-z\s]+$/, "City must contain only alphabets and spaces"]
        },
        zipcode: {
            type: String,
            required: true,
            match: [/^\d{5}-\d{4}$/, "Zip code format must be DDDDD-DDDD"]
        }
    },

    phone: {
        type: String,
        required: true,
        match: [/^\d-\d{3}-\d{3}-\d{4}$/, "Phone format must be D-DDD-DDD-DDDD"]
    },

    website: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, "Website must be valid http or https URL"]
    },

    company: {
        name: { type: String, required: true },
        catchPhrase: { type: String, required: true },
        bs: { type: String, required: true }
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
