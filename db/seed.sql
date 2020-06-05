create table helo_users(
    user_id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic text
);

create table helo_posts(
    post_id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id int references helo_users(user_id)
);

alter table helo_users
    alter password
    set data type text;