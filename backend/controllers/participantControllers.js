const pool = require('../db');

const getAllParticipant = async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM participant');
        res.status(200).send(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addParticipant = async (req, res) => {
    const { 
        name,
        email,
        phno,
        registration_status
    } = req.body;
    try {
        await pool.query('INSERT INTO participant (name,email,phno,registration_status) VALUES ($1, $2, $3, $4)',[name,email,phno,registration_status]);
        res.status(200).send({message: "Successfully added a PARTICIPANT"})
    } catch (error) {
        console.log("Error in adding participant: ",error);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllParticipant,
    addParticipant
};