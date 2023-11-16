const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const e = require('express');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const availableUser = await User.findOne({ email });
    if (availableUser) {
        res.status(400);
        throw new Error("User is already resgistered!");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);

    const user = await User.create({
        username,
        password: hashedPassword,
        email,
    })
    console.log(`user created ${user}`);
    if (user) {
        res.status(200).json({
            _id: user.id,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email });
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1m" }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error('email or password is not valid');
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})
module.exports = { registerUser, loginUser, currentUser }