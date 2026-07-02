const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,

        email: {
            type: String,
            unique: true,
        },

        password: String,

        age: Number,

        interests: [String],

        isOnline: {
            type: Boolean,
            default: false,
        },

        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },

            coordinates: {
                type: [Number],
                default: [0, 0],
            },
        },
    },
    { timestamps: true }
);

userSchema.index({
    location: "2dsphere",
});

module.exports = mongoose.model(
    "User",
    userSchema
);