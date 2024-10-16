const pool = require('../db');

const getAllVolunteers = async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM volunteer');
        res.status(200).send(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addVolunteer = async (req, res) => {
    const { 
        name,
        email,
        phno,
        role
    } = req.body;
    try {
        await pool.query('INSERT INTO volunteer (name,email,phno,role) VALUES ($1, $2, $3, $4)',[name,email,phno,role]);
        res.status(200).send({message: "Successfully added a VOLUNTEER"})
    } catch (error) {
        console.log("Error in adding volunteer: ",error);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllVolunteers,
    addVolunteer
};