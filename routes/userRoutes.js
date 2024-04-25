const router = require('express').Router();
const userModel = require('../models/userModel');


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to validate password (e.g., minimum length)
const isValidPassword = (password) => {
    return password.length >= 6; // Change as per your requirements
};


//POST REQUEST
router.post('/addUser', async (req, res) => {
    try {
        const {email,password} = req.body;
        const data = req.body; 
        const temp = await userModel.findOne({ email: email })
        if (!isValidEmail(email))
        {
            return res.status(400).json({message:"Invalid email Format"})
        }
        
        if (!isValidPassword(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        if (temp) {
            res.status(203).json("User is already registered")
        }
        else {
            const newUser = new userModel(data);
            await newUser.save().then(() => {
                res.status(200).json({ message: "User Added Successfully" })
            })
        }
    } catch (error) {

        console.log(error);
    }
})

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ users })
    } catch (error) {
        console.log(error);
    }
})

router.get('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    try {
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await userModel.findOne({ email: email });
        if (user) {
            if (user.password != password) {
                res.status(301).json({ message: "Incorrect Password! Try Again" })
            }
            else {
                res.status(200).json({ user, message: "Login Successfull" })
            }
        }
        else {
            res.status(404).json({ message: "Get Registered First." })
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
