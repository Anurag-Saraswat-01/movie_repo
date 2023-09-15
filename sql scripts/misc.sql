--select m.movie_name, d.director_name, YEAR(m.release_date) as year, m.rated, m.runtime, (
--	select ROUND(AVG(ISNULL(CAST(r.rating as float), 0)), 2)
--	from Ratings r
--	where r.movie_id = m.movie_id) as avg_rating,
--	(select m.movie_id, '["' + STRING_AGG(g.genre_name, '"], ["') + '"]'
--	from Genre g
--	where g.genre_id = mg.genre_id
--	and m.movie_id = mg.movie_id
--	group by m.movie_id) as genres
--from Movies m
--inner join Directors d
--on m.director_id = d.director_id
--inner join Movie_Genre mg
--on m.movie_id = mg.movie_id

select m.movie_id, m.movie_name, m.rated,  CAST(m.release_date as nvarchar) as release_date,
	m.runtime, d.director_name,
	(select ROUND(AVG(ISNULL(CAST(r.rating as float), 0)), 2)
	from Ratings r
	where r.movie_id = m.movie_id) as avg_rating,
	STRING_AGG(g.genre_name, ', ') as genres
from Movies m
inner join Directors d
on m.director_id = d.director_id
inner join Movie_Genre mg
on m.movie_id = mg.movie_id
inner join Genre g
on g.genre_id = mg.genre_id
group by m.movie_id, m.movie_name, m.rated, m.runtime, d.director_name, m.release_date
select * from Users

print cast('24 Mar 1972' as date)

select * from Movies
select * from Directors
select * from Genre
select * from Movie_Genre
select * from Ratings

delete from Movie_Genre where movie_id = (
	select movie_id from Movies where movie_name = 'the shawshank redemption')
delete from Movies where movie_name = 'the shawshank redemption'
delete from Directors where director_name = 'nolan'
delete from Genre where genre_name = 'romance'

delete from Movie_Genre
delete from Ratings
delete from Movies
delete from Directors
delete from Genre

use movie_repo


alter table movies
add file_path nvarchar(200),
[user_id] int foreign key references Users([user_id])
--alter column rated nvarchar(50)
--release_date date,
--rated nvarchar(2),
--runtime int
--drop column image_url
--drop column year

select movie_id, avg(cast(rating as float)) as avg_rating
from Ratings
group by movie_id
 
select '["' + STRING_AGG(movie_name, '"], ["') + '"]'
from Movies

select m.movie_id, '["' + STRING_AGG(g.genre_name, '"], ["') + '"]'
from Genre g
inner join Movie_Genre mg
on mg.genre_id = g.genre_id
inner join Movies m
on m.movie_id = mg.movie_id
group by m.movie_id

