const pool = require('../db');

const getAllClubs = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM club');
        res.status(200).send(data.rows);
    } catch (error) {
        console.error("Error in fetching clubs:", error);
        res.sendStatus(500);
    }
}

const getCountOfEventsInClubs = async (req, res) => {
    try {
        const data = await pool.query('SELECT club.name AS club_name, COUNT(event.id) AS event_count FROM club JOIN event ON club.name = event.by_club GROUP BY club.id, club.name ORDER BY event_count DESC');
        res.status(200).json(data.rows);
    } catch (error) {
        console.error("Error in getting all events: ", error);
        res.status(500).json({ message: "Error retrieving events" });
    }
}

const addClub = async (req, res) => {
    const { 
        name,
        description,
        club_chair,
        club_coordinator,
        email,
        mem_count,
        category
    } = req.body;
    
    try {
        const existingClub = await pool.query('SELECT * FROM club WHERE name = $1',[name]);
        if (existingClub.rows.length > 0) {
            return res.status(400).json({ message: "Club with this name already exists" });
        }
        await pool.query(
            'INSERT INTO club (name, description, club_chair, club_coordinator, email, mem_count, category) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [name, description, club_chair, club_coordinator, email, mem_count, category]
        );
        res.status(200).send({ message: "Successfully added a CLUB" });
    } catch (error) {
        console.error("Error in adding club:", {
            error: error.message,
            stack: error.stack,
            body: req.body
        });
        res.status(500).json({ 
            message: "Error adding club",
            details: error.message
        });
    }
}

const deleteClub = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ 
                message: "Invalid ID format. ID must be a number",
                receivedId: req.params.id
            });
        }

        // Check if club exists
        const checkClub = await pool.query('SELECT * FROM club WHERE id = $1', [id]);
        
        if (checkClub.rowCount === 0) {
            return res.status(404).json({ 
                message: "Club not found",
                id: id
            });
        }

        // Check for active events - using clubid instead of club_id
        const eventCount = await pool.query('SELECT COUNT(*) FROM event WHERE id = $1', [id]);

        if (parseInt(eventCount.rows[0].count) > 0) {
            return res.status(400).json({ 
                message: "Cannot delete club with active events", 
                activeEvents: parseInt(eventCount.rows[0].count)
            });
        }

        const result = await pool.query(
            'DELETE FROM club WHERE id = $1 RETURNING *',
            [id]
        );
        
        res.status(200).json({ 
            message: "Successfully deleted club",
            deletedClub: result.rows[0]
        });
    } catch (error) {
        console.error("Error in deleting club:", {
            error: error.message,
            stack: error.stack,
            id: req.params.id
        });

        res.status(500).json({ 
            message: "Error deleting club",
            details: error.message
        });
    }
}

const updateClub = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const {
            name,
            description,
            club_chair,
            club_coordinator,
            email,
            mem_count,
            category
        } = req.body;

        // Validate ID format
        if (isNaN(id)) {
            return res.status(400).json({ 
                message: "Invalid ID format. ID must be a number",
                receivedId: req.params.id
            });
        }

        // Check if club exists
        const checkClub = await pool.query('SELECT * FROM club WHERE id = $1', [id]);
        
        if (checkClub.rowCount === 0) {
            return res.status(404).json({ 
                message: "Club not found",
                id: id
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
        if (description !== undefined) {
            updates.push(`description = $${parameterCount}`);
            values.push(description);
            parameterCount++;
        }
        if (club_chair !== undefined) {
            updates.push(`club_chair = $${parameterCount}`);
            values.push(club_chair);
            parameterCount++;
        }
        if (club_coordinator !== undefined) {
            updates.push(`club_coordinator = $${parameterCount}`);
            values.push(club_coordinator);
            parameterCount++;
        }
        if (email !== undefined) {
            updates.push(`email = $${parameterCount}`);
            values.push(email);
            parameterCount++;
        }
        if (mem_count !== undefined) {
            if (mem_count < 0) {
                return res.status(400).json({ 
                    message: "Member count cannot be negative",
                    receivedValue: mem_count
                });
            }
            updates.push(`mem_count = $${parameterCount}`);
            values.push(mem_count);
            parameterCount++;
        }
        if (category !== undefined) {
            updates.push(`category = $${parameterCount}`);
            values.push(category);
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
            UPDATE club 
            SET ${updates.join(', ')}
            WHERE id = $${parameterCount}
            RETURNING *
        `;

        const result = await pool.query(updateQuery, values);
        
        // Using clubid instead of club_id
        const eventCount = await pool.query('SELECT COUNT(*) FROM event WHERE id = $1', [id]);

        res.status(200).json({
            message: "Successfully updated club",
            updatedClub: result.rows[0],
            activeEvents: parseInt(eventCount.rows[0].count)
        });

    } catch (error) {
        console.error("Error in updating club:", {
            error: error.message,
            stack: error.stack,
            id: req.params.id,
            body: req.body
        });

        res.status(500).json({ 
            message: "Error updating club",
            details: error.message
        });
    }
}

module.exports = {
    getAllClubs,
    addClub,
    deleteClub,
    updateClub,
    getCountOfEventsInClubs
};