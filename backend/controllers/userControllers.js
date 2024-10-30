const pool = require('../db');

const getAllUsers = async (req, res) => {
    try {
        const data = await pool.query('SELECT id, password, email, name FROM users');
        res.status(200).json(data.rows);
    } catch (error) {
        console.error("Error in fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

const addUser = async (req, res) => {
    const { password, email, name } = req.body;
    
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const result = await pool.query(
            'INSERT INTO users (password, email, name) VALUES ($1, $2, $3) RETURNING id, email, name',
            [password, email.toLowerCase(), name || null]
        );

        res.status(201).json({
            message: "Successfully added user",
            user: result.rows[0]
        });
    } catch (error) {
        if (error.code === '23505') { 
            return res.status(409).json({ message: "Email already exists" });
        }
        console.error("Error in adding user:", error);
        res.status(500).json({ message: "Error adding user" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ 
                message: "Invalid ID format",
                receivedId: req.params.id
            });
        }

        const checkUser = await pool.query(
            'SELECT id, email, name FROM users WHERE id = $1',
            [id]
        );
        
        if (checkUser.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING id, email, name',
            [id]
        );
        
        res.status(200).json({ 
            message: "Successfully deleted user",
            deletedUser: result.rows[0]
        });
    } catch (error) {
        console.error("Error in deleting user:", error);
        res.status(500).json({ message: "Error deleting user" });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { email, password, name } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ 
                message: "Invalid ID format",
                receivedId: req.params.id
            });
        }

        const checkUser = await pool.query(
            'SELECT id FROM users WHERE id = $1',
            [id]
        );
        
        if (checkUser.rowCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const updates = [];
        const values = [];
        let parameterCount = 1;

        if (password !== undefined) {
            updates.push(`password = $${parameterCount}`);
            values.push(password);
            parameterCount++;
        }

        if (email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format" });
            }
            updates.push(`email = $${parameterCount}`);
            values.push(email.toLowerCase());
            parameterCount++;
        }

        if (name !== undefined) {
            updates.push(`name = $${parameterCount}`);
            values.push(name);
            parameterCount++;
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }

        values.push(id);

        const updateQuery = `
            UPDATE users
            SET ${updates.join(', ')}
            WHERE id = $${parameterCount}
            RETURNING id, email, name
        `;

        const result = await pool.query(updateQuery, values);

        res.status(200).json({
            message: "Successfully updated user",
            updatedUser: result.rows[0]
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: "Email already exists" });
        }
        console.error("Error in updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
};

module.exports = {
    getAllUsers,
    addUser,
    deleteUser,
    updateUser
};