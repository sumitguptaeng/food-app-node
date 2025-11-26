import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

const getUser = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            })
        }
        // hind password 
        user.password = undefined;
        //resp
        res.status(200).send({
            success: true,
            message: 'User get Successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Get User API',
            error,
        });
    }
};


// UPDATE USER
const updateUser = async (req, res) => {
    try {

        const user = await userModel.findById({ _id: req.body.id });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found",
            });
        }
        //update
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User Updated SUccessfully",
        });
    } catch (error) {
        console.log(erorr);
        res.status(500).send({
            success: false,
            message: "Error In Udpate Userr API",
            error,
        });
    }
};


// UPDATE USER PASSWORR
const updatePassword = async (req, res) => {
    try {

        const user = await userModel.findById({ _id: req.body.id });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Usre Not Found",
            });
        }
        // get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Old or New PasswOrd",
            });
        }
        //check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Password Update API",
            error,
        });
    }
};


// RESET password
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please Privide All Fields",
            });
        }
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found or invlaid answer",
            });
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Reset SUccessfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in PASSWORD RESET API",
            error,
        });
    }
};


// DLEETE PROFILE ACCOUNT
const deleteProfile = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr In Delete Profile API",
            error,
        });
    }
};

export default { getUser, updateUser, updatePassword, resetPassword, deleteProfile };