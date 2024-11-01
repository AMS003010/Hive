const express = require('express');
const cors = require('cors');
const pool = require('./db');

const setupRoutes = require('./routes/setUpRoutes');
const eventRoutes = require('./routes/eventRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const organiserRoutes = require('./routes/organiserRoutes');
const participantRoutes = require('./routes/participantRoutes');
const userRoutes = require('./routes/userRoutes');
const clubRoutes = require('./routes/clubRoutes');
const searchRoutes = require('./routes/searchRoutes');

const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());
app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/setup',setupRoutes);
app.use('/api/event',eventRoutes);
app.use('/api/volunteer',volunteerRoutes);
app.use('/api/organiser',organiserRoutes);
app.use('/api/participant',participantRoutes);
app.use('/api/login', userRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/search', searchRoutes);

app.listen(port,() => {
    console.log(`Server started on ${port}`);
})