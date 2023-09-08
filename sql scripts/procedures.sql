insert into [dbo].[Users](username, [password])
values ('anurag', '1234');

select * from Users;
delete from Users;

create or alter proc usp_register_user @username nvarchar(20), @password nvarchar(60)
as
begin
	insert into [dbo].[Users]([username], [password])
	values(@username, @password)
end;

exec usp_register_user @username = 'john doe', @password = '1234';

select [password]
from [dbo].[Users]
where [username] = 'anurag'

create or alter proc usp_get_password @username nvarchar(20), @password nvarchar(60) out
as
begin
	select @password = [password]
	from [dbo].[Users]
	where [username] = @username
end;

declare @pw nvarchar(60)
exec usp_get_password @username = 'anurag', @password = @pw out;
print @pw

SELECT m.movie_id, m.movie_name, m.[year], m.image_path, d.director_name,
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
GROUP BY m.movie_id, m.movie_name, m.[year], m.image_path, d.director_name, g.genre_name