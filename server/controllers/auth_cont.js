import { db } from "../db.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import cookie from 'cookie-parser'



export const register = (req, res) => {
    //CHECK EXISTING USER

    const q = "SELECT * FROM users WHERE email =? OR username =?"

    db.query(q, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.json(err)
        if (data.length) return res.status(409).json("User Already Exists!")

        //Encrypt password using bcryptjs library
        //Hash to password and create a user

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Password is hashed now to add it to out DB

        const q = "INSERT INTO users(username, email, password) VALUES(?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been Created!");
        })

    });
}




export const login = (req, res) => {

    // Check if the user exists
    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //Check the password for the user by comparing to the hashed password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
        //check if the password is correct -
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or Password!")

        //Extracting the password from the payload for the access_token cookie
        const { password, ...other } = data[0]

        //Creating a unique token for a user
        const token = jwt.sign({ id: data[0].user_id }, "jwtkey");
        console.log("The token is: ", token)

        //sending the cookies to the frontend
        res.cookie("access_token", token, {
            httpOnly: true
        })
        res.status(200).json(other)

    });
}

export const logout = (req, res) => {
    console.log("In the logout function of backend")
    res.clearCookie("access_token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: "localhost", // set the domain of the cookie
        path: "/", // set the path of the cookie
             // set the expiration date of the cookie to the past
    }).status(200).json("User has been Logged Out!");
}