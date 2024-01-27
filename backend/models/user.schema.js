const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 50,},
    avatar: { type: String, required: true, },
    email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, unique: true, },
    password: { type: String, required: true, },
    created_at: { type: Date, default: Date.now, },
}, {versionKey: false})

const UserModel = mongoose.model('user', userSchema)

module.exports={UserModel}

// "name": "Niswarth",
// "avatar": "https://i.pravatar.cc/300",
// "email": "niswarth@gmail.com",
// "password": "niswarth@321"