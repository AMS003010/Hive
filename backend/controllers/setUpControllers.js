const pool = require('../db');

const createUserTable = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS users');  // Drop the existing table
        await pool.query('CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(30) NOT NULL, password VARCHAR(30), mem_count INT DEFAULT 0, name VARCHAR(30))');  // Recreate table
        console.log("User table created");
        return true;
    } catch (error) {
        console.log("Error creating USER table:", error);
        return false;
    }
}



const createClubTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS club (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, description VARCHAR(30), club_chair VARCHAR(30), club_coordinator VARCHAR(30), email VARCHAR(30), mem_count INT DEFAULT 0)');
        console.log("CLUB table created");
        return true;
    } catch (error) {
        console.log("Error creating CLUB table:", error);
        return false;
    }
}


const createEventTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS event (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, description VARCHAR(30), start_date TIMESTAMP, end_date TIMESTAMP, location VARCHAR(30), created_by VARCHAR(30), vol_count INT DEFAULT 0, max_participants INT)');
        console.log("EVENT table created");
        return true;
    } catch (error) {
        console.log("Error creating EVENT table:", error);
        return false;
    }
}

const createVolunteerTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS volunteer (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(30), phno VARCHAR(30), role VARCHAR(30))');
        console.log("VOLUNTEER table created");
        return true;
    } catch (error) {
        console.log("Error creating VOLUNTEER table:", error);
        return false;
    }
}

const createOrganiserTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS organiser (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(30), phno VARCHAR(30), role VARCHAR(30))');
        console.log("ORGANISER table created");
        return true;
    } catch (error) {
        console.log("Error creating ORGANISER table:", error);
        return false;
    }
}

const createParticipantTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS participant (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(30), phno VARCHAR(30), registration_status VARCHAR(30))');
        console.log("PARTICIPANT table created");
        return true;
    } catch (error) {
        console.log("Error creating PARTICIPANT table:", error);
        return false;
    }
}

const createTables = async (req, res) => {
    const event_table = await createEventTable();
    const club_table = await createClubTable();
    const volunteer_table = await createVolunteerTable();
    const organiser_table = await createOrganiserTable();
    const participant_table = await createParticipantTable();
    const user_table = await createUserTable();
    if (event_table && club_table && volunteer_table && organiser_table && participant_table && user_table)
    {
        res.status(200).send({ message: "Successfully created tables" });
    } else {
        res.status(500).send({ message: "Failed to create tables" });
    }
}

module.exports = {
    createTables,
};
