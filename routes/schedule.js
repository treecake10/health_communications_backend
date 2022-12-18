const express = require('express');
const router = express.Router();

const Datesoff = require("../models/Datesoff");
const DatesoffDemoModel = require('../models/Datesoff.js');


router.post("/datesOff/:id", async (req, res) => {

    const dateExists = await Datesoff.find({ 

        $and: [ 
            {docID: req.params.id}, 
            {date: req.body.date} 
        ]

    });

    if(dateExists.length !== 0) {

        const updateFields = req.body;

        DatesoffDemoModel.findOneAndUpdate({ 

            $and: [ 
                {docID: req.params.id}, 
                {date: req.body.date} 
            ]},

            updateFields, {new: true},
            (err, result) => {
                if (err) {
                    res.send("Unable to update schedule for the doctor")
                } else {
                    res.status(200).json(result);
                }
            }
        )
        
    } else {

        const docID = req.body.docID;
        const date = req.body.date;
        const time = req.body.time;

        const newDayTimeOff = new Datesoff({
            docID: docID,
            date: date,
            time: time
        });
    
        newDayTimeOff.save()

    }
          
})


router.get('/getScheduled/:doctorId/:dat', async (req, res) => {

    Datesoff.find({ 

        $and: [ 

            {date: req.params.dat}, 
            {docID: req.params.doctorId} 

        ]}, ['time'])
        
        .then(scheduled => {

            if (scheduled.length === 0) { 
                return res.send("No time off scheduled for User")
            }

            return res.status(200).json(scheduled);

        }
    )
    .catch(err => next(err));

});


module.exports = router;
