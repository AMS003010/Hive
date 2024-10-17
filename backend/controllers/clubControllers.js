const pool = require('../db');

const getAllClubs = async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM club');
        res.status(200).send(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addClub = async (req, res) => {
    const { 
        name,
        description,
        club_chair,
        club_coordinator,
        email,
        mem_count
    } = req.body;
    try {
        await pool.query('INSERT INTO club (name,description,start_date,end_date,location,created_by,vol_count,max_participants) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',[name,description,club_chair,club_coordinator,email,mem_count]);
        res.status(200).send({message: "Successfully added an CLUB"})
    } catch (error) {
        console.log("Error in adding club: ",error);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllClubs,
    addClub
};