-- USERS

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

-- MOVIES

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

--declare @director_id_res int;
--exec usp_get_director_id @director_name = 'Anurag', @director_id = @director_id_res;
--print @director_id_res

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

