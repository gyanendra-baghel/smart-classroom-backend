import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    const {fullname, email, username, password, role } = req.body

    console.log(fullname, email, username, password);

    if([fullname, email, username, password].some((field) => !field || field.trim() === "")) {
        return res.status(404).json({ message: 'All fields are required.' });
    }

    const existedUser = await User.findOne({ username });

    if(existedUser) {
        console.log("User Exist");
        return res.status(404).json({ message: 'User with username already exists.' });
    } else {
        console.log("User not Exist");
        return res.status(200).json({ message: 'User with username not already exists.' });
    }
    // try {
    //     const newUser = await User.create({
    //         fullname,
    //         email,
    //         password,
    //         role,
    //         username: username.toLowerCase()
    //     });
    //     return res.status(201).json({
    //         statusCode: 200,
    //         user: newUser,
    //         message: "User is created."
    //     });
    // } catch(error) {
    //     return res.status(404).json({ message: 'Internal Server Error.' });
    // }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body

    if(!username) {
        throw new Error("Username is required!");
    }

    const user = await User.findOne({ username })

    if(!user) {
        throw new Error("User does not exists!")
    }

    const isValidPassword = await user.isPasswordCorrect(password);

    if(!isValidPassword) {
        throw new Error("Invalid user credentials.");
    }

    // console.log("username and password matched");

    const accessToken = user.generateToken(user);
}

const logoutUser = () => {}

export {
    registerUser,
    loginUser,
    logoutUser
}