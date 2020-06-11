INSERT INTO helo_users (username, password)
VALUES ($1, $2);

SELECT * FROM helo_users
WHERE username = $1;