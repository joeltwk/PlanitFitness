DROP TABLE IF EXISTS exc_rout;
DROP TABLE IF EXISTS workout;
DROP TABLE IF EXISTS exercise_set;
DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS routine;
DROP TABLE IF EXISTS user;       


DROP TABLE IF EXISTS exc_rout;

CREATE TABLE IF NOT EXISTS user (
	user_id INT AUTO_INCREMENT,
	username VARCHAR(30) NOT NULL,
	user_password VARCHAR(30) NOT NULL,
	PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS workout (
	workout_id INT AUTO_INCREMENT,
	user_id INT NOT NULL,
	routine_id INT NOT NULL,
	workout_date DATE NOT NULL,
	completed BOOLEAN,
	PRIMARY KEY(workout_id),
	FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE,
	FOREIGN KEY(routine_id) REFERENCES routine(routine_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercise (
	exercise_id INT AUTO_INCREMENT,
	user_id INT NOT NULL,
	exercise_name VARCHAR(20) NOT NULL,
	category VARCHAR(20),
	PRIMARY KEY(exercise_id),
	FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exercise_set (
	exercise_set_id INT AUTO_INCREMENT,
	exercise_id INT NOT NULL,
	weight DECIMAL(10, 2) NOT NULL,
	reps INT NOT NULL,
	PRIMARY KEY(exercise_set_id),
	FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS routine (
	routine_id INT AUTO_INCREMENT,
	user_id INT NOT NULL,
	routine_name VARCHAR(20) NOT NULL,
	routine_desc VARCHAR(40),
	PRIMARY KEY(routine_id),
	FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exc_rout (
	exercise_id INT NOT NULL,
	routine_id INT NOT NULL,
	PRIMARY KEY(exercise_id, routine_id),
	FOREIGN KEY(exercise_id) REFERENCES exercise(exercise_id) ON DELETE CASCADE,
	FOREIGN KEY(routine_id) REFERENCES routine(routine_id) ON DELETE CASCADE
);
	