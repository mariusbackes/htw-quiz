import mysql from './connection';

export function getPasswordHash(email) {
    let sql = "select password from user where email = ?";

    return new Promise((resolve, reject) => {
        mysql.query(sql, [email], (error, result) => {
            if (error) throw error;
            resolve(result[0].password);
        });
    })
}