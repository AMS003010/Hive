const pool = require('../db');

const getAllEvent = async (req,res) => {
    try {
        const data = await pool.query('SELECT * FROM event');
        res.status(200).send(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addEvent = async (req, res) => {
    const { 
        name,
        description,
        start_date,
        end_date,
        location,
        created_by,
        vol_count,
        max_participants
    } = req.body;
    try {
        await pool.query('INSERT INTO event (name,description,start_date,end_date,location,created_by,vol_count,max_participants) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',[name,description,start_date,end_date,location,created_by,vol_count,max_participants]);
        res.status(200).send({message: "Successfully added an EVENT"})
    } catch (error) {
        console.log("Error in adding event: ",error);
        res.sendStatus(500);
    }
}

module.exports = {
    getAllEvent,
    addEvent
};