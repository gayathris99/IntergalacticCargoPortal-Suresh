// We are using pg node module, as we are using the PostgreSQL for DB.
// pg is used for connecting and querying the DB
const { Pool } = require('pg')

// Creating a universal connection string to the data base for all further connections
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

module.exports = pool