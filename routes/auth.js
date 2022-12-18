const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
var ObjectID = require('mongodb').ObjectId;

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function isAuthenticated(req, res, next) {
    
    if(req.headers.authorization) {

        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, "secret", (err, user) => {

            if(!user) {
                return res.json({message: "User not authenticated"});
            } else {
                next();
            }

        })

    }  
    
}


router.get("/protected", isAuthenticated, async (req, res) => {

    return res.json({message: "This is a protected route" });

});


router.post("/signin", async (req, res) => {

    const { email, password } = req.body.data;

    if(!emailRegexp.test(email)) {
        return res.json({ message: "Invalid email" });
    }


    const user = await User.findOne({email: { $regex : new RegExp("^" + email + "$", "i") }});
    
    if(user) {
            
        bcrypt.compare(password, user.password).then(isMatch => {
            
            if(isMatch) {

                const payload = {
                    email
                };

                jwt.sign(payload, "secret", { expiresIn: "1d" }, (err, token) => {

                    if (err) {
                        console.log("jwt", token);
                    } else {
                        return res.json({
                            message: "User logged In!",
                            token: token,
                            firstName: user.firstName,
                            id: user._id
                        });
                    }

                });

            } else {
                return res.json({ message: "Incorrect password" });
            }

        });
 
    } else {
        return res.json({ message: "Incorrect credentials" });
    }

})


router.post("/AdminSignin", async (req, res) => {

    const { email, password } = req.body.data;

    if(!emailRegexp.test(email)) {
        return res.json({ message: "Invalid email" });
    }


    const admin = await Doctor.findOne({email: { $regex : new RegExp("^" + email + "$", "i") }});
    
    if(admin) {
            
        bcrypt.compare(password, admin.password).then(isMatch => {
            
            if(isMatch) {

                const payload = {
                    email
                };

                jwt.sign(payload, "secret", { expiresIn: "1d" }, (err, token) => {

                    if (err) {
                        console.log("jwt", token);
                    } else {
                        return res.json({
                            message: "User logged In!",
                            token: token,
                            fullname: admin.fullname,
                            id: admin.id
                        });
                    }
                });

            } else {
                return res.json({ message: "Incorrect password" });
            }

        });
 
    } else {
        return res.json({ message: "Incorrect credentials" });
    }

})


router.post("/signup", async (req, res) => {

    const userUID = req.body.userUID;
    const { firstName, middleName, lastName, email, password } = req.body.data;
    const pcpDoc = req.body.pcpDoc;
    const approvedDocFamilies = req.body.approvedDocFamilies;

    const userObjId = new ObjectID(userUID);

    if(!emailRegexp.test(email)) {
        return res.json({ message: "Invalid email" });
    }
    

    const userExists = await User.findOne({email: { $regex : new RegExp("^" + email + "$", "i") }});

    if(userExists) {

        return res.json({ message: "User already exists" });

    } else {

        const newUser = new User({
            userUID: userObjId,
            firstName,
            middleName,
            lastName,
            email,
            password,
            pcpDoc,
            approvedDocFamilies
        });

        bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {

            if (err) throw err;

            newUser.password = hash;

            newUser.save()
                .then(response => {
                   res.status(200).json({
                     success: true,
                     result: response
                   })
                })
                .catch(err => {
                  res.status(500).json({
                     errors: [{ error: err }]
                  });
               });
            });
        });
   
    }

})


router.post("/addStaff", async (req, res) => {

    const docUID = req.body.docUID;
    const { fullname, email, password } = req.body.data;
    const fieldOfStudy = req.body.fieldOfStudy;

    const docObjId = new ObjectID(docUID);

    if(!emailRegexp.test(email)) {
        return res.json({ message: "Email invalid" });
    }


    const docExists = await Doctor.findOne({email: { $regex : new RegExp("^" + email + "$", "i") }});

    if(docExists) {

        return res.json({ message: "User already exists" });

    } else {

        const newStaff = new Doctor({
            docUID: docObjId,
            fullname: fullname,
            email: email,
            password: password,
            fieldOfStudy: fieldOfStudy
    
        });

        bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {

            if (err) throw err;

            newStaff.password = hash;

            newStaff.save()
                .then(response => {
                   res.status(200).json({
                     success: true,
                     result: response
                   })
                })
                .catch(err => {
                  res.status(500).json({
                     errors: [{ error: err }]
                  });
                });
            });
        });

    }

})


module.exports = router;