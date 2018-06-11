/**
 * DAO-File for user management
 */

let mysql = require('../db_connection');

exports.register = (user_data) => {
    let return_value = { success: false };
    let sql = "insert into user (username, email, first_name, last_name, password) values ?";

    return new Promise((resolve, reject) => {
        mysql.query(sql, [user_data], (error, result) => {
            if (error) throw error;
            return_value.success = result.affectedRows > 0;
            resolve(return_value);
        });
    });
}