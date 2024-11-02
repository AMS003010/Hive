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
        await pool.query('CREATE TABLE IF NOT EXISTS club (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, description VARCHAR(500), club_chair VARCHAR(100), club_coordinator VARCHAR(100), email VARCHAR(100), mem_count INT DEFAULT 0, category VARCHAR(100))');
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
        await pool.query('CREATE TABLE IF NOT EXISTS volunteer (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100), phno VARCHAR(100), event VARCHAR(100))');
        console.log("VOLUNTEER table created");
        return true;
    } catch (error) {
        console.log("Error creating VOLUNTEER table:", error);
        return false;
    }
}

const createOrganiserTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS organiser (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(100), phno VARCHAR(100), event VARCHAR(100))');
        console.log("ORGANISER table created");
        return true;
    } catch (error) {
        console.log("Error creating ORGANISER table:", error);
        return false;
    }
}

const createParticipantTable = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS participant (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100), phno VARCHAR(100), registration_status VARCHAR(100), event VARCHAR(100))');
        console.log("PARTICIPANT table created");
        return true;
    } catch (error) {
        console.log("Error creating PARTICIPANT table:", error);
        return false;
    }
}

const createStatisticsFunction = async () => {
    try {
        const query = `
            CREATE OR REPLACE FUNCTION get_event_statistics()
            RETURNS TABLE (
                total_volunteers INT,
                total_organizers INT,
                total_participants INT,
                total_budget INT
            ) AS $$
            BEGIN
                RETURN QUERY
                SELECT
                    (SELECT COALESCE(SUM(vol_count), 0)::INT FROM event) AS total_volunteers,
                    (SELECT COALESCE(SUM(org_count), 0)::INT FROM event) AS total_organizers,
                    (SELECT COALESCE(SUM(curr_participants), 0)::INT FROM event) AS total_participants,
                    (SELECT COALESCE(SUM(budget), 0)::INT FROM event) AS total_budget;
            END;
            $$ LANGUAGE plpgsql;
        `;
        await pool.query(query);
        console.log("Statistics SQL function created");
        return true;
    } catch (error) {
        console.error("Error creating statistics function:", error);
        return false;
    }
};

const initTriggers = async () => {
    try {
        await pool.query(`
            CREATE OR REPLACE FUNCTION increment_vol_count()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE event SET vol_count = vol_count + 1 WHERE name = NEW.event;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
        console.log("TRIGGER: Volunteer Increment Function created");

        await pool.query(`
            CREATE OR REPLACE FUNCTION decrement_vol_count()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE event SET vol_count = vol_count - 1 WHERE name = OLD.event;
                RETURN OLD;
            END;
            $$ LANGUAGE plpgsql;
        `);
        console.log("TRIGGER: Volunteer Decrement Function created");

        await pool.query(`
            CREATE OR REPLACE FUNCTION increment_org_count()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE event SET org_count = org_count + 1 WHERE name = NEW.event;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
        console.log("TRIGGER: Organizer Increment Function created");

        await pool.query(`
            CREATE OR REPLACE FUNCTION decrement_org_count()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE event SET org_count = org_count - 1 WHERE name = OLD.event;
                RETURN OLD;
            END;
            $$ LANGUAGE plpgsql;
        `);
        console.log("TRIGGER: Organizer Decrement Function created");

        await pool.query(`
            CREATE OR REPLACE FUNCTION increment_par_count()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE event SET curr_participants = curr_participants + 1 WHERE name = NEW.event;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);
        console.log("TRIGGER: Participant Increment Function created");

        await pool.query(`
            CREATE OR REPLACE FUNCTION decrement_par_count()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE event SET curr_participants = curr_participants - 1 WHERE name = OLD.event;
                RETURN OLD;
            END;
            $$ LANGUAGE plpgsql;
        `);
        console.log("TRIGGER: Participant Decrement Function created");

        // Create trigger to increment vol_count after a volunteer is added to an event
        await pool.query(`
            CREATE TRIGGER increment_vol_count_trigger
            AFTER INSERT ON volunteer
            FOR EACH ROW
            WHEN (NEW.event IS NOT NULL)
            EXECUTE FUNCTION increment_vol_count();
        `);
        console.log("TRIGGER: Volunteer Increment Trigger created");

        // Create trigger to decrement vol_count after a volunteer is removed from an event
        await pool.query(`
            CREATE TRIGGER decrement_vol_count_trigger
            AFTER DELETE ON volunteer
            FOR EACH ROW
            WHEN (OLD.event IS NOT NULL)
            EXECUTE FUNCTION decrement_vol_count();
        `);
        console.log("TRIGGER: Volunteer Decrement Trigger created");

        // Create trigger to increment vol_count after a volunteer is added to an event
        await pool.query(`
            CREATE TRIGGER increment_org_count_trigger
            AFTER INSERT ON organiser
            FOR EACH ROW
            WHEN (NEW.event IS NOT NULL)
            EXECUTE FUNCTION increment_org_count();
        `);
        console.log("TRIGGER: Organizer Increment Trigger created");

        // Create trigger to decrement vol_count after a volunteer is removed from an event
        await pool.query(`
            CREATE TRIGGER decrement_org_count_trigger
            AFTER DELETE ON organiser
            FOR EACH ROW
            WHEN (OLD.event IS NOT NULL)
            EXECUTE FUNCTION decrement_org_count();
        `);
        console.log("TRIGGER: Organizer Decrement Trigger created");

        // Create trigger to increment vol_count after a volunteer is added to an event
        await pool.query(`
            CREATE TRIGGER increment_par_count_trigger
            AFTER INSERT ON participant
            FOR EACH ROW
            WHEN (NEW.event IS NOT NULL)
            EXECUTE FUNCTION increment_par_count();
        `);
        console.log("TRIGGER: Participant Increment Trigger created");

        // Create trigger to decrement vol_count after a volunteer is removed from an event
        await pool.query(`
            CREATE TRIGGER decrement_par_count_trigger
            AFTER DELETE ON participant
            FOR EACH ROW
            WHEN (OLD.event IS NOT NULL)
            EXECUTE FUNCTION decrement_par_count();
        `);
        console.log("TRIGGER: Participant Decrement Trigger created");

        console.log("Triggers for updating volunteer, organiser, participant count on event table created successfully.");
        return true;
    } catch (error) {
        console.error("Error creating triggers for updating:", error);
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
    const statistics_function = await createStatisticsFunction();
    const trigger_function = await initTriggers();
    if (event_table && club_table && volunteer_table && organiser_table && participant_table && user_table && statistics_function && trigger_function)
    {
        res.status(200).send({ message: "Successfully created tables, functions and triggers" });
    } else {
        res.status(500).send({ message: "Failed to create tables, functions and triggers" });
    }
}

module.exports = {
    createTables,
};
