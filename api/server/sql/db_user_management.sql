# Datenbank-Nutzer anlegen

create user if not exists 'htw_quiz_user'@'%' identified by 'X8MpBzYzwK';
grant select, insert, update, delete on htw_quiz.user to 'htw_quiz_user'@'%';
grant select, insert, update on htw_quiz.highscore to 'htw_quiz_user'@'%';
grant select, insert, update, delete on htw_quiz.questions to 'htw_quiz_user'@'%';
grant select, insert, update, delete on htw_quiz.multiple_choice to 'htw_quiz_user'@'%';
grant select, insert, update, delete on htw_quiz.game to 'htw_quiz_user'@'%';
grant select, insert, update, delete on htw_quiz.contributors to 'htw_quiz_user'@'%';
grant select, insert, update on htw_quiz.time_frame to 'htw_quiz_user'@'%';
grant execute on htw_quiz.* to 'htw_quiz_user'@'%';

flush privileges;