const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const app = express();

const dashboard = require('./Routes/dashboard')
const participants = require('./Routes/participants')
const university = require('./Routes/university')
const team = require('./Routes/team')
const modules = require('./Routes/modules')
const ambassador = require('./Routes/ambassador')
const organizer = require('./Routes/organizer')

const register = require('./Routes/register')
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

app.get('/', (req, res) => {
    res.send('Visit /api/participant for Participants details')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/participant/', participants);
app.use('/api/university', university);
app.use('/api/team', team);
app.use('/api/modules', modules);
app.use('/api/register', register)
app.use('/api/ambassador', ambassador);
app.use('/api/organizer', organizer)
app.use('/api/dashboard', dashboard)
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

const server = app.listen(PORT, (err) => {
    if (err) throw err;

    console.log(`listening to port ${PORT}`)
})