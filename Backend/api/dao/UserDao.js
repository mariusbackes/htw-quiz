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

exports.login = (user_data) => {
    let return_value = { success: false };

    // TODO: Update last_login
    let sql = "";

    return new Promise((resolve, reject) => {
        mysql.query(sql, [user_data], (error, result) => {
            if (error) throw error;
            return_value.success = result.affectedRows > 0;
            resolve(return_value);
        });
    });
}

exports.change_password = (data) => {
    let return_value = { success: false };
    let sql = "update user set password = :password where user_id = :user_id";

    return new Promise((resolve, reject) => {
        mysql.query(sql, {password: data.password, user_id: user_id}, (error, result) => {
            if (error) throw error;
            return_value.success = result.affectedRows > 0;
            resolve(return_value);
        });
    });
}

exports.change_email = (data) => {
    let return_value = { success: false };
    let sql = "update user set email = :email where user_id = :user_id";

    return new Promise((resolve, reject) => {
        mysql.query(sql, {email: data.email, user_id: user_id}, (error, result) => {
            if (error) throw error;
            return_value.success = result.affectedRows > 0;
            resolve(return_value);
        });
    });
}

exports.change_name = (data) => {
    let return_value = { success: false };
    let sql = "update user set first_name = :first_name, last_name = :last_name where user_id = :user_id";

    return new Promise((resolve, reject) => {
        mysql.query(sql, {first_name: data.first_name, last_name: data.last_name, user_id: user_id}, (error, result) => {
            if (error) throw error;
            return_value.success = result.affectedRows > 0;
            resolve(return_value);
        });
    });
}