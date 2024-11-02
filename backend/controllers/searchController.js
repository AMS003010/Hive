const pool = require('../db');

const searchEvents = async (req, res) => {
    const { 
        category,
        limit
    } = req.body;
    console.log(category,typeof(category),limit, typeof(limit));
    if (category!=="null" && limit!=="null") {
        try {
            const data = await pool.query('SELECT * FROM event WHERE by_club IN (SELECT name FROM club WHERE category = $1) AND budget > $2 ORDER BY budget DESC',[category,limit]);
            res.status(200).json(data.rows);
        } catch (error) {
            console.error("Error in filtering event: ", error);
            res.status(500).json({ message: "Error filtering events" });
        }
    }
    if (category==="null" && limit!=="null") {
        try {
            const data = await pool.query('SELECT * FROM event WHERE budget > $1 ORDER BY budget DESC',[limit]);
            res.status(200).json(data.rows);
        } catch (error) {
            console.error("Error in filtering event: ", error);
            res.status(500).json({ message: "Error filtering events" });
        }
    }
    if (category!=="null" && limit==="null") {
        try {
            const data = await pool.query('SELECT * FROM event WHERE by_club IN (SELECT name FROM club WHERE category = $1) ORDER BY budget DESC',[category]);
            res.status(200).json(data.rows);
        } catch (error) {
            console.error("Error in filtering event: ", error);
            res.status(500).json({ message: "Error filtering events" });
        }
    }
    if (category==="null" && limit==="null") {
        try {
            const data = await pool.query('SELECT * FROM event ORDER BY budget DESC');
            res.status(200).json(data.rows);
        } catch (error) {
            console.error("Error in filtering event: ", error);
            res.status(500).json({ message: "Error filtering events" });
        }
    }
}

const getAllEntities = async (req,res) => {
    try {
        const result = await pool.query('SELECT * FROM get_event_statistics();');
        
        if (result.rows.length > 0) {
            const stats = result.rows[0];
            res.status(200).json({
                totalVolunteers: stats.total_volunteers,
                totalOrganizers: stats.total_organizers,
                totalParticipants: stats.total_participants,
                totalBudget: stats.total_budget
            });
        } else {
            res.status(404).json({ message: "No statistics found" });
        }
    } catch (error) {
        console.error("Error fetching event statistics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    searchEvents,
    getAllEntities
}