const pool = require('../db');

const getAllEvents = async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM event');
        res.status(200).json(data.rows);
    } catch (error) {
        console.error("Error in getting all events: ", error);
        res.status(500).json({ message: "Error retrieving events" });
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
        await pool.query('INSERT INTO event (name, description, start_date, end_date, location, created_by, vol_count, max_participants) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [name, description, start_date, end_date, location, created_by, vol_count, max_participants]);
        res.status(201).json({ message: "Successfully added an EVENT" });
    } catch (error) {
        console.error("Error in adding event: ", error);
        res.status(500).json({ message: "Error adding event" });
    }
}

const deleteEvent = async (req, res) => {
    const id = parseInt(req.params.id, 10); // Assuming the event ID is passed as a URL parameter
    
    if (isNaN(id)) {
        return res.status(400).json({ 
            message: "Invalid ID format. ID must be a number",
            receivedId: req.params.id
        });
    }

    try {
        const checkEvent = await pool.query('SELECT * FROM event WHERE id = $1', [id]);
        
        if (checkEvent.rowCount === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        const participantCount = await pool.query('SELECT COUNT(*) FROM participant WHERE id = $1', [id]);
        const volunteerCount = await pool.query('SELECT COUNT(*) FROM volunteer WHERE id = $1', [id]);

        const result = await pool.query('DELETE FROM event WHERE id = $1 RETURNING *', [id]);
        
        res.status(200).json({ 
            message: "Successfully deleted event", 
            deletedEvent: result.rows[0],
            affectedRecords: {
                participants: parseInt(participantCount.rows[0].count),
                volunteers: parseInt(volunteerCount.rows[0].count)
            }
        });
    } catch (error) {
        console.error("Error in deleting event: ", error);
        res.status(500).json({ message: "Error deleting event" });
    }
}

const updateEvent = async (req, res) => {
    const id = parseInt(req.params.id, 10);  // Assuming the event ID is passed as a URL parameter
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

    if (isNaN(id)) {
        return res.status(400).json({ 
            message: "Invalid ID format. ID must be a number",
            receivedId: req.params.id
        });
    }

    try {
        const checkEvent = await pool.query('SELECT * FROM event WHERE id = $1', [id]);
        
        if (checkEvent.rowCount === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (start_date && end_date) {
            const startDate = new Date(start_date);
            const endDate = new Date(end_date);
            if (startDate > endDate) {
                return res.status(400).json({ 
                    message: "Invalid date range: start date cannot be after end date" 
                });
            }
        }

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
        if (start_date !== undefined) {
            updates.push(`start_date = $${parameterCount}`);
            values.push(start_date);
            parameterCount++;
        }
        if (end_date !== undefined) {
            updates.push(`end_date = $${parameterCount}`);
            values.push(end_date);
            parameterCount++;
        }
        if (location !== undefined) {
            updates.push(`location = $${parameterCount}`);
            values.push(location);
            parameterCount++;
        }
        if (created_by !== undefined) {
            updates.push(`created_by = $${parameterCount}`);
            values.push(created_by);
            parameterCount++;
        }
        if (vol_count !== undefined) {
            updates.push(`vol_count = $${parameterCount}`);
            values.push(vol_count);
            parameterCount++;
        }
        if (max_participants !== undefined) {
            updates.push(`max_participants = $${parameterCount}`);
            values.push(max_participants);
            parameterCount++;
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        values.push(id);
        const updateQuery = `
            UPDATE event 
            SET ${updates.join(', ')}
            WHERE id = $${parameterCount}
            RETURNING *
        `;

        const result = await pool.query(updateQuery, values);
        res.status(200).json({
            message: "Successfully updated event",
            updatedEvent: result.rows[0]
        });
    } catch (error) {
        console.error("Error in updating event: ", error);
        res.status(500).json({ message: "Error updating event" });
    }
}

module.exports = {
    getAllEvents,
    addEvent,
    deleteEvent,
    updateEvent
};
