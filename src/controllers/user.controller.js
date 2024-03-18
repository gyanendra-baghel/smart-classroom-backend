import { User } from "../models/user.model.js";

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
    }
    
    try {
        const newUser = await User.create({
            fullname,
            email,
            password,
            role,
            username: username.toLowerCase()
        });
        
        const createdUser = await User.findById(newUser._id).select(
            "-password -refreshToken"
            );
            
        if (!createdUser) {
            return res.status(500).json({ message: "Something went wrong while registering the user" });
        }

        return res.status(201).json({
            statusCode: 200,
            user: newUser,
            message: "User is created."
        });
    } catch(error) {
        return res.status(404).json({ message: 'Internal Server Error.' });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body

    if(!username) {
        return res.status(404).json({ message: 'Username is required!' });
    }
    
    const user = await User.findOne({ username })
    
    if(!user) {
        return res.status(404).json({ message: 'User does not exists!' });
    }
    
    const isValidPassword = await user.isPasswordCorrect(password);
    
    if(!isValidPassword) {
        return res.status(404).json({ message: "Invalid user credentials." });
    }

    const accessToken = User.generateToken(user);
    res.cookie('accessToken', accessToken, { httpOnly: true });

    return res.status(201).json({
        statusCode: 200,
        user,
        message: "User is matched."
    });
}

const logoutUser = () => {
    res.clearCookie('accessToken');
    return res.status(200).json({ message: "User logged out successfully." });
}

export {
    registerUser,
    loginUser,
    logoutUser
}