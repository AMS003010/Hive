const pool = require('../db');

const getAllParticipants = async (req, res) => {
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
        await pool.query('INSERT INTO participant (name, email, phno, registration_status) VALUES ($1, $2, $3, $4)', [name, email, phno, registration_status]);
        res.status(200).send({ message: "Successfully added a PARTICIPANT" });
    } catch (error) {
        console.log("Error in adding participant: ", error);
        res.sendStatus(500);
    }
}

const deleteParticipant = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        if (isNaN(id)) {
            return res.status(400).json({ 
                message: "Invalid ID format. ID must be a number",
                receivedId: req.params.id
            });
        }

        const result = await pool.query(
            'DELETE FROM participant WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ 
                message: "Participant not found",
                id: id
            });
        }
        
        res.status(200).json({ 
            message: "Successfully deleted participant",
            deletedParticipant: result.rows[0] 
        });

    } catch (error) {
        console.error("Error in deleting participant:", {
            error: error.message,
            stack: error.stack,
            id: req.params.id
        });

        res.status(500).json({ 
            message: "Error deleting participant",
            details: error.message
        });
    }
};

const updateParticipant = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, email, phno, registration_status } = req.body;

    try {
        // Validate ID format
        if (isNaN(id)) {
            return res.status(400).json({ 
                message: "Invalid ID format. ID must be a number",
                receivedId: req.params.id
            });
        }

        // First check if participant exists
        const checkParticipant = await pool.query('SELECT * FROM participant WHERE id = $1', [id]);
        
        if (checkParticipant.rowCount === 0) {
            return res.status(404).json({ message: "Participant not found" });
        }

        // Update only the fields that are provided
        const updates = [];
        const values = [];
        let parameterCount = 1;

        if (name !== undefined) {
            updates.push(`name = $${parameterCount}`);
            values.push(name);
            parameterCount++;
        }
        if (email !== undefined) {
            updates.push(`email = $${parameterCount}`);
            values.push(email);
            parameterCount++;
        }
        if (phno !== undefined) {
            updates.push(`phno = $${parameterCount}`);
            values.push(phno);
            parameterCount++;
        }
        if (registration_status !== undefined) {
            updates.push(`registration_status = $${parameterCount}`);
            values.push(registration_status);
            parameterCount++;
        }

        // If no updates provided
        if (updates.length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        values.push(id);
        const updateQuery = `
            UPDATE participant 
            SET ${updates.join(', ')}
            WHERE id = $${parameterCount}
            RETURNING *
        `;

        const result = await pool.query(updateQuery, values);
        res.status(200).json({
            message: "Successfully updated participant",
            updatedParticipant: result.rows[0]
        });
    } catch (error) {
        console.error("Error in updating participant:", {
            error: error.message,
            stack: error.stack,
            id: req.params.id,
            body: req.body
        });

        res.status(500).json({ 
            message: "Error updating participant",
            details: error.message
        });
    }
}

module.exports = {
    getAllParticipants,
    addParticipant,
    deleteParticipant,
    updateParticipant
};

