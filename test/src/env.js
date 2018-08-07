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
    },
    game: {
        game_id: -1,
        name: "Testspiel",
        description: "Eine Beschreibung für ein Testspiel",
        creator: -1, // User-ID of creator
        challenged: true,
        time_frame: {
          from: new Date().toLocaleString(),
          to: new Date().toLocaleString()
        }
    },
    question: {
        text: "Dies ist eine kleine Testfrage",
        game_id: -1,
        correct_answer: "Hier steht die Korrekte Antwort",
        time_limit: 20,
        is_multiple_choice: true,
        multiple_choice: {
          wrong_answer_1: "Das hier ist die erste falsche Antwort",
          wrong_answer_2: "Hier kommt die zweite Unwahrheit",
          wrong_answer_3: "Und zuletzt auch noch die Dritte"
        }
    },
}