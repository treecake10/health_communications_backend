const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(express.json());


//connect to mongoose
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB connected!'))
.catch(err => {
    console.log(err);
})


// Middlewares
app.use(cors());
app.use(bodyParser.json());


// Routes middleware
app.use('/api', require('./routes/auth'));
app.use('/doctors', require('./routes/doctors'));
app.use('/users', require('./routes/users'));
app.use('/schedule', require('./routes/schedule'));
app.use('/appointments', require('./routes/appointments'));


app.get("/read", (req, res) => {
    res.status(200).send({message: "Welcome to Health Comm. backend"})
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
    console.log(`Express server is running on port ${PORT}`);
})

