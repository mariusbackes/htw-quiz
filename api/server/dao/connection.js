import { createConnection } from 'mysql';

var connection = createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    database : 'htw_quiz'
});

connection.connect(function(err) {
    if (err) throw err;
});

export default connection;