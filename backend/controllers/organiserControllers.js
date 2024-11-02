const pool = require('../db');

// Get all organisers
const getAllOrganisers = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM organiser');
        res.status(200).send(data.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

// Add a new organiser
const addOrganiser = async (req, res) => {
    const { 
        name,
        email,
        phno,
        event
    } = req.body;

    try {
        const existingOrganizer = await pool.query('SELECT * FROM organiser WHERE name = $1 AND event = $2',[name, event]);
        if (existingOrganizer.rows.length > 0) {
            return res.status(400).json({ message: "Organizer with this name for this event already exists" });
        }
        await pool.query('INSERT INTO organiser (name, email, phno, event) VALUES ($1, $2, $3, $4)', [name, email, phno, event]);
        res.status(200).send({ message: "Successfully added an ORGANISER" });
    } catch (error) {
        console.log("Error in adding organiser: ", error);
        res.sendStatus(500);
    }
};

// Delete an organiser
const deleteOrganiser = async (req, res) => {
    const { id } = req.params;  // Assuming the organiser ID is passed as a URL parameter
    
    try {
        // Check if organiser exists before deletion
        const checkOrganiser = await pool.query('SELECT * FROM organiser WHERE id = $1', [id]);
        
        if (checkOrganiser.rowCount === 0) {
            return res.status(404).json({ message: "Organiser not found" });
        }

        const result = await pool.query('DELETE FROM organiser WHERE id = $1 RETURNING *', [id]);
        
        res.status(200).json({ 
            message: "Successfully deleted organiser", 
            deletedOrganiser: result.rows[0] 
        });
    } catch (error) {
        console.log("Error in deleting organiser: ", error);
        res.sendStatus(500);
    }
};

// Update an organiser
const updateOrganiser = async (req, res) => {
    const { id } = req.params;  // Assuming the organiser ID is passed as a URL parameter
    const {
        name,
        email,
        phno,
        event
    } = req.body;

    try {
        // First check if organiser exists
        const checkOrganiser = await pool.query('SELECT * FROM organiser WHERE id = $1', [id]);
        
        if (checkOrganiser.rowCount === 0) {
            return res.status(404).json({ message: "Organiser not found" });
        }

        // Update only the fields that are provided
        const updates = [];
        const values = [];
        let parameterCount = 1;

        if (name) {
            updates.push(`name = $${parameterCount}`);
            values.push(name);
            parameterCount++;
        }
        if (email) {
            updates.push(`email = $${parameterCount}`);
            values.push(email);
            parameterCount++;
        }
        if (phno) {
            updates.push(`phno = $${parameterCount}`);
            values.push(phno);
            parameterCount++;
        }
        if (event) {
            updates.push(`event = $${parameterCount}`);
            values.push(event);
            parameterCount++;
        }

        // If no updates provided
        if (updates.length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        values.push(id);
        const updateQuery = `
            UPDATE organiser 
            SET ${updates.join(', ')}
            WHERE id = $${parameterCount}
            RETURNING *
        `;

        const result = await pool.query(updateQuery, values);
        res.status(200).json({
            message: "Successfully updated organiser",
            updatedOrganiser: result.rows[0]
        });
    } catch (error) {
        console.log("Error in updating organiser: ", error);
        res.sendStatus(500);
    }
};

module.exports = {
    getAllOrganisers,
    addOrganiser,
    deleteOrganiser,
    updateOrganiser
};
