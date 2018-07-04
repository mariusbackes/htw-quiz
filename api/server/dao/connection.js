import { createConnection } from 'mysql';

var connection = createConnection({
    host     : 'localhost',
    user     : 'htw_quiz_user',
    password : 'X8MpBzYzwK',
    database : 'htw_quiz'
});

connection.connect(function(err) {
    if (err) throw err;
});

export default connection;