import pg from "pg"; 

const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "db-103-106",
    password: "",
    port: 5432
});

export default pool;