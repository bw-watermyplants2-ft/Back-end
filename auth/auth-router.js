
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const { jwtSecret } = require("../config/secret.js");

router.post("/register", (req, res) => {
  // implement registration
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.addUser(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error)
            res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
  // implement login    
    if (req.body.username){
        Users.findBy({ username: req.body.username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateToken(user); // get a token

                res.status(200).json({
                message: `Welcome ${user.username}!`,
                token, // send the token
                });
            } else {
                res.status(401).json({ message: "Invalid Credentials" });
            }
        })
        .catch(error => {
            console.log("ERROR:", error);
            res.status(500).json({ error: "/login error" });
        });

    } else {

    Users.findBy({ phonenumber: req.body.phonenumber})
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user); // get a token

            res.status(200).json({
            message: `Welcome ${user.username}!`,
            token, // send the token
            });
        } else {
            res.status(401).json({ message: "Invalid Credentials" });
        }
    })
    .catch(error => {
        console.log("ERROR:", error);
        res.status(500).json({ error: "/login error" });
    });
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role || "user",
    };

    const options = {
        expiresIn: "3h",
    };

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
