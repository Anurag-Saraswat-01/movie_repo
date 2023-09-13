SELECT m.movie_id, m.movie_name, d.director_name,
	   g.genre_name, ROUND(AVG(ISNULL(r.rating, 0)), 1) AS average_rating
FROM Movies m
INNER JOIN Directors d
ON m.director_id = d.director_id
INNER JOIN Movie_Genre mg
ON m.movie_id = mg.movie_id
INNER JOIN Genre g
ON mg.genre_id = g.genre_id
INNER JOIN Ratings r
ON m.movie_id = r.movie_id
GROUP BY m.movie_id, m.movie_name, d.director_name, g.genre_name

print cast('24 Mar 1972' as date)

select * from Movies
select * from Directors
select * from Genre
select * from Movie_Genre

delete from Movie_Genre
delete from Movies
delete from Directors where director_name = 'nolan'
delete from Genre where genre_name = 'romance'

alter table movies
--alter column rated nvarchar(5)
--add image_url nvarchar(200),
--release_date date,
--rated nvarchar(2),
--runtime int
drop column image_url
--drop column year

insert into Genre(genre_name)
output inserted.genre_id
values('Comedy')