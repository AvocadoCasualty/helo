select hp.title, hu.username, hp.img, hp.content, hu.user_id, hp.author_id, hp.post_id from helo_posts hp
join helo_users hu on hu.user_id = hp.author_id
where hp.title like '%'||$1||'%' and not (hu.user_id = $2);