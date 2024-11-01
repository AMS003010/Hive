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


// app.get("/setup", async (req,res) => {
//     try {
//         await pool.query('CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
//         res.status(200).send({message:"Successfully created table"})
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// })

// app.post("/",async (req,res) => {
//     const { name, location } = req.body;
//     try {
//         await pool.query('INSERT INTO schools (name, address) VALUES ($1, $2)',[name, location]);
//         res.status(200).send({message: "Successfully added student"})
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// })

// app.get("/", async (req,res) => {
//     try {
//         const data = await pool.query('SELECT * FROM schools');
//         res.status(200).send(data.rows)
//     } catch (error) {
//         console.log(error);
//         res.sendStatus(500);
//     }
// })

app.listen(port,() => {
    console.log(`Server started on ${port}`);
})