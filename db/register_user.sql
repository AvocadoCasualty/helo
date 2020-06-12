INSERT INTO helo_users (username, password, profile_pic)
VALUES ($1, $2, $3);

SELECT * FROM helo_users
WHERE username = $1;