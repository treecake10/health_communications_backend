const express = require('express');
const router = express.Router();

const DoctorDemoModel = require('../models/Doctor.js');


router.get("/getDoctorInfo/:id", (req, res, next) => {

    DoctorDemoModel.find({_id: req.params.id}, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    })

})


router.get("/getDoctors", async (req, res) => {

    DoctorDemoModel.find({}, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.send(result);
        }
    })

})


router.get("/getDocByFieldOfStudy/:fos", async (req, res) => {

    DoctorDemoModel.find({fieldOfStudy: req.params.fos})
    .then(study => {

        if(!study) {
            return res.send("Invalid field of study")
        }

        return res.status(200).json(study);

    })
    .catch(err => next(err));
})


module.exports = router;