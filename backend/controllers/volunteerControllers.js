const pool = require('../db');

const getAllVolunteers = async (req, res) => {
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
        await pool.query('INSERT INTO volunteer (name,email,phno,role) VALUES ($1, $2, $3, $4)', [name, email, phno, role]);
        res.status(200).send({message: "Successfully added a VOLUNTEER"})
    } catch (error) {
        console.log("Error in adding volunteer: ", error);
        res.sendStatus(500);
    }
}

const deleteVolunteer = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
 
        
        if (isNaN(id)) {
            return res.status(400).json({ 
                message: "Invalid ID format. ID must be a number",
                receivedId: req.params.id
            });
        }

        const result = await pool.query(
            'DELETE FROM volunteer WHERE id = $1 RETURNING *',
            [id]  
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ 
                message: "Volunteer not found",
                id: id
            });
        }
        
        res.status(200).json({ 
            message: "Successfully deleted volunteer",
            deletedVolunteer: result.rows[0] 
        });

    } catch (error) {
        console.error("Error in deleting volunteer:", {
            error: error.message,
            stack: error.stack,
            id: req.params.id
        });

        res.status(500).json({ 
            message: "Error deleting volunteer",
            details: error.message
        });
    }
};

const updateVolunteer = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, email, phno, role } = req.body;

        // Validate ID format
        if (isNaN(id)) {
            return res.status(400).json({ 
                message: "Invalid ID format. ID must be a number",
                receivedId: req.params.id
            });
        }

        // Build update query dynamically
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
        if (role !== undefined) {
            updates.push(`role = $${parameterCount}`);
            values.push(role);
            parameterCount++;
        }
        

        // Check if any updates were provided
        if (updates.length === 0) {
            return res.status(400).json({ 
                message: "No update data provided",
                receivedData: req.body
            });
        }

        // Add ID to values array
        values.push(id);

        const updateQuery = `
            UPDATE volunteer 
            SET ${updates.join(', ')}
            WHERE id = $${parameterCount}
            RETURNING *
        `;

        const result = await pool.query(updateQuery, values);

        // Check if volunteer exists
        if (result.rowCount === 0) {
            return res.status(404).json({ 
                message: "Volunteer not found",
                id: id
            });
        }

        res.status(200).json({
            message: "Successfully updated volunteer",
            updatedVolunteer: result.rows[0]
        });

    } catch (error) {
        console.error("Error in updating volunteer:", {
            error: error.message,
            stack: error.stack,
            id: req.params.id,
            body: req.body
        });

        res.status(500).json({ 
            message: "Error updating volunteer",
            details: error.message
        });
    }
};

module.exports = {
    getAllVolunteers,
    addVolunteer,
    deleteVolunteer,
    updateVolunteer,
};
