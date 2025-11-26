import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'user name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    address: {
        type: Array,
        required: [true, 'address is required'],
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
    },
    userType: {
        type: String,
        required: [true, 'usertype is required'],
        default: 'client',
        enum: ['client', 'Admin', 'vendor', 'driver'],
    },
    profile: {
        type: String,
        default: 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-color-icon.png',
    },

    answer: {
        type: String,
        required: [true, 'Answer is required'],

    },

}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;