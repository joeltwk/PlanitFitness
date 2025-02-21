INSERT INTO user VALUES (NULL, 'HelenDown', 'password1');
INSERT INTO user VALUES (NULL, 'PeterRead', 'password2');

INSERT INTO exercise VALUES (NULL, 1, 'Bench Press', 'Chest');
INSERT INTO exercise VALUES (NULL, 1, 'Barbell Squat', 'Legs');
INSERT INTO exercise VALUES (NULL, 1, 'Dumbbell Press', 'Chest');
INSERT INTO exercise VALUES (NULL, 1, 'Shoulder Press', 'Shoulder');
INSERT INTO exercise VALUES (NULL, 1, 'Goblet Squat', 'Legs');
INSERT INTO exercise VALUES (NULL, 1, 'Lat Pull Down', 'Back');
INSERT INTO exercise VALUES (NULL, 1, 'Barbell Row', 'Back');
INSERT INTO exercise VALUES (NULL, 1, 'Leg Press', 'Legs');
INSERT INTO exercise VALUES (NULL, 1, 'Chest Flies', 'Chest');
INSERT INTO exercise VALUES (NULL, 1, 'Dumbbell Row', 'Back');
INSERT INTO exercise VALUES (NULL, 1, 'Bulgarian Squat', 'Legs');
INSERT INTO exercise VALUES (NULL, 1, 'Weighted Pullups', 'Back');

INSERT INTO routine VALUES (NULL, 1, 'Lower Body A', 'Squat focus lower day');
INSERT INTO routine VALUES (NULL, 1, 'Upper Body A', 'Push upper day');

INSERT INTO exc_rout VALUES (2, 1);
INSERT INTO exc_rout VALUES (1, 1);

INSERT INTO workout VALUES(NULL, 1, 1,'2024-08-02', true);

INSERT INTO exercise_set VALUES(NULL, 2, 1, 1, 60, 8);
INSERT INTO exercise_set VALUES(NULL, 2, 1, 2, 70, 8);
INSERT INTO exercise_set VALUES(NULL, 2, 1, 3, 70, 7);
INSERT INTO exercise_set VALUES(NULL, 1, 1, 1, 50, 8);
INSERT INTO exercise_set VALUES(NULL, 1, 1, 2, 60, 7);
INSERT INTO exercise_set VALUES(NULL, 1, 1, 3, 60, 7);
