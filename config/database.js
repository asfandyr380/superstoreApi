const { createPool } = require('mysql');
// Main Database Config
const pool = createPool({
    host: 'sql170.main-hosting.eu',
    user: 'u265587006_super',
    password: 'Qw4hddqcrg',
    database: 'u265587006_super_store',
    connectionLimit: 10
});

// Testing Database Config
// const pool = createPool({
//     host: 'localhost',
//     user: 'username',
//     password: 'changeme',
//     database: 'superstore',
//     connectionLimit: 10
// });
// pool.getConnection(function (err, connection) {
//     if (err) {
//         console.log(err);
//     }
// });

module.exports = pool;