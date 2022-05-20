const express = require('express');
const router = express.Router();

const UserDemoModel = require('../models/User.js');


router.post("/updateUserInfo/:userId", async (req, res) => {

    const updateFields = req.body;

    UserDemoModel.findOneAndUpdate({userUID: req.params.userId},
        updateFields, {new: true},
        (err, result) => {
            if (err) {
                res.send("Unable to update info for user")
            } else {
                res.status(200).json(result);
            }
        })
        
})


router.get("/getUserInfo/:id", (req, res, next) => {

    UserDemoModel.find({_id: req.params.id}, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    })

})


router.get("/getPatients", async (req, res) => {

    UserDemoModel.find({}, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.send(result);
        }
    })

})


module.exports = router;