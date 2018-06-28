# Datenbank-Nutzer anlegen

create user if not exists 'htw_quiz_user'@'%' identified by 'X8MpBzYzwK';
grant select, insert, update, delete on htw-quiz.user to 'htw_quiz_user'@'%';
grant select, insert, update on htw-quiz.highscore to 'htw_quiz_user'@'%';
grant select, insert, update, delete on htw-quiz.question to 'htw_quiz_user'@'%';
grant select, insert, update, delete on htw-quiz.multiple_choice to 'htw_quiz_user'@'%';
grant select, insert, update, delete on htw-quiz.game to 'htw_quiz_user'@'%';
grant select, insert, update, delete on htw-quiz.contributors to 'htw_quiz_user'@'%';
grant select, insert, update on htw-quiz.time_frame to 'htw_quiz_user'@'%';
grant execute on htw-quiz.* to 'htw_quiz_user'@'%';

flush privileges;