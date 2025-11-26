import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// Register Controller
const register = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;

        // Validation
        if (!userName || !email || !password || !phone || !address || !answer) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields",
            });
        }

        // Check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered. Please login.",
            });
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
            phone,
            answer,
        });

        return res.status(201).json({
            success: true,
            message: "Successfully registered",
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};


// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        //check user password  | compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Credentials",
            });
        }
        // token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        user.password = undefined;
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token,

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Login API",
            error,
        });
    }
};

export default { register, login };
