export const env = {
    url: 'http://localhost:3000/api',
    post_options: {
        method: 'POST'
    },
    get_options: {
        method: 'GET'
    },
    user: {
        "user_id": null,
        "username": "mariusb73", 
        "email": "mariusbackes@icloud.com", 
        "first_name": "Marius", 
        "last_name": "Backes", 
        "password": "test_passwort", 
        "registered_at": new Date().toLocaleString(),
        "last_login": new Date().toLocaleString(),
        "completed_games": 0,
        "reached_points": 0,
        "admin": 0
    }
}