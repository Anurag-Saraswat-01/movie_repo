
-- register new user
create or alter proc usp_insert_user @username nvarchar(20), @password nvarchar(60)
as
begin
	insert into Users(username, [password])
	values(@username, @password)
end;

-- get password of user for login
create or alter proc usp_get_password @username nvarchar(20), @password nvarchar(60) out
as
begin
	select @password = [password]
	from Users
	where username = @username
end;

-- get all directors
create or alter proc usp_get_directors
as
begin
	select * from directors
end;

-- get director id
create or alter proc usp_get_director_id @director_name nvarchar(30), @director_id int out
as
begin
	select @director_id = director_id
	from Directors
	where director_name = @director_name
end;

-- insert new director
create or alter proc usp_insert_director @director_name nvarchar(30)
as
begin
	insert into Directors(director_name)
	output inserted.director_id
	values (@director_name)
end;

-- get movie id
create or alter proc usp_get_movie_id @movie_name nvarchar(50), @movie_id int out
as
begin
	select @movie_id = movie_id
	from Movies
	where movie_name = @movie_name
end;

-- insert new movie
create or alter proc usp_insert_movie @movie_name nvarchar(50), @release_date nvarchar(12), 
									  @rated nvarchar(5), @runtime int, @director_id int
as
begin
	insert into movies(movie_name, release_date, rated, runtime, director_id)
	output inserted.movie_id
	values(@movie_name, CAST(@release_date as date), @rated, @runtime, @director_id)
end;

-- get all genres
create or alter proc usp_get_genres
as
begin
	select * from Genre
end;

-- get genre id
create or alter proc usp_get_genre_id @genre_name nvarchar(10), @genre_id int out
as
begin
	select @genre_id = genre_id
	from Genre
	where genre_name = @genre_name
end;

-- insert new genre
create or alter proc usp_insert_genre @genre_name nvarchar(10)
as
begin
	insert into Genre(genre_name)
	output inserted.genre_id
	values (@genre_name)
end;

-- insert movie_genre
create or alter proc usp_insert_movie_genre @movie_id int, @genre_id int
as
begin
	insert into Movie_Genre(movie_id, genre_id)
	values (@movie_id, @genre_id)
end;

-- insert new rating
create or alter proc usp_insert_rating @movie_id int, @user_id int, @rating int
as
begin
	insert into Ratings(movie_id, [user_id], rating)
	values (@movie_id, @user_id, @rating)
end;

-- get all data of all movies
create or alter proc usp_get_all_movie_data
as
begin
	select m.movie_id, m.movie_name, m.rated, CAST(m.release_date as nvarchar) as release_date,
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
	group by m.movie_id, m.movie_name, m.rated, m.runtime, m.release_date, d.director_name
end;

-- get single movie data
create or alter proc usp_get_single_movie_data @movie_id int
as
begin
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
	where m.movie_id = @movie_id
	group by m.movie_id, m.movie_name, m.rated, m.runtime,m.release_date, d.director_name
end;

-- get user rating for movie
create or alter proc usp_get_user_rating @movie_id int, @user_id int, @rating int out
as
begin
	select @rating = rating
	from Ratings
	where movie_id = @movie_id
	and [user_id] = @user_id
end;

-- update user rating for movie
create or alter proc usp_update_user_rating @movie_id int, @user_id int, @rating int
as
begin
	update Ratings
	set rating = @rating
	where movie_id = @movie_id
	and [user_id] = @user_id
end;