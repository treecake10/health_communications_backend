const express = require('express');
const router = express.Router();

const AppointmentsDemoModel = require('../models/Appointments.js');


router.post("/addAppointment", async (req, res) => {

    const usrID = req.body.userID;
    const docID = req.body.doctorID;
    const fN = req.body.firstname;
    const lN = req.body.lastname;
    const date = req.body.date;
    const time = req.body.time;
    const type = req.body.type;
    const status = req.body.status;
    

    const newAppointment = new AppointmentsDemoModel({

        userID: usrID,
        doctorID: docID,
        firstName: fN,
        lastName: lN,
        date: date,
        time: time,
        type: type,
        status: status

    });

    newAppointment.save();
        
})


router.get("/getAppointment/:id", async (req, res) => {

    AppointmentsDemoModel.find({
        $or: [
            { doctorID: req.params.id },
            { userID: req.params.id }
        ]
    })
    .then(appointments => {

        if(appointments.length === 0) {
            return res.send("No appointments for the user")
        }

        return res.status(200).json(appointments);

    })
    .catch(err => next(err));
})


router.post('/cancelAppt/:apptId', async (req, res) => {

    AppointmentsDemoModel.findByIdAndRemove(req.params.apptId, function (err, response) {
        if (err){
            console.log(err)
        } else{
            console.log("Removed Appointment");
        }
    })

});


router.post('/updateApptInfo/:apptId', async (req, res) => {

    const updateFields = req.body;

    AppointmentsDemoModel.findOneAndUpdate({_id: req.params.apptId}, 
        updateFields, {new: true},
        (err, result) => {
            if (err) {
                res.send("Unable to update info for", {apptId})
            } else {
                res.status(200).json(result);
            }
        })
        
});

module.exports = router;