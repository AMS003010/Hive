const pool = require('../db');

const createClubTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS club (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(100), club_chair VARCHAR(100), club_coordinator VARCHAR(100), email VARCHAR(100), mem_count INT DEFAULT 0, category VARCHAR(100))');
        console.log("CLUB table created");
        return true;
    } catch (error) {
        console.log("Error creating CLUB table:", error);
        return false;
    }
}

const createEventTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS event (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(500), start_date TIMESTAMP, end_date TIMESTAMP, location VARCHAR(100), created_by VARCHAR(100), by_club VARCHAR(100), vol_count INT DEFAULT 0, org_count INT DEFAULT 0, max_participants INT, curr_participants INT, budget INT, first_contact VARCHAR(100), sec_contact VARCHAR(100))');
        console.log("EVENT table created");
        return true;
    } catch (error) {
        console.log("Error creating EVENT table:", error);
        return false;
    }
}

const createVolunteerTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS volunteer (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100), phno VARCHAR(100), role VARCHAR(100))');
        console.log("VOLUNTEER table created");
        return true;
    } catch (error) {
        console.log("Error creating VOLUNTEER table:", error);
        return false;
    }
}

const createOrganiserTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS organiser (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(100), phno VARCHAR(100), role VARCHAR(100))');
        console.log("ORGANISER table created");
        return true;
    } catch (error) {
        console.log("Error creating ORGANISER table:", error);
        return false;
    }
}

const createParticipantTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS participant (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100), phno VARCHAR(100), registration_status VARCHAR(100))');
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
    if (event_table && club_table && volunteer_table && organiser_table && participant_table) {
        res.status(200).send({ message: "Successfully created tables" });
    } else {
        res.status(500).send({ message: "Failed to create tables" });
    }
}

module.exports = {
    createTables,
};
