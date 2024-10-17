const pool = require('../db');

const getAllOrganisers = async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM organiser');
        res.status(200).send(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addOrganiser = async (req, res) => {
    const { 
        name,
        email,
        phno,
        role
    } = req.body;
    try {
        await pool.query('INSERT INTO organiser (name,email,phno,role) VALUES ($1, $2, $3, $4)',[name,email,phno,role]);
        res.status(200).send({message: "Successfully added a ORGANISER"})
    } catch (error) {
        console.log("Error in adding organiser: ",error);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllOrganisers,
    addOrganiser
};