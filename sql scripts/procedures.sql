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
									  @rated nvarchar(2), @runtime int, @director_id int, @image_url nvarchar(200)
as
begin
	insert into movies(movie_name, release_date, rated, runtime, director_id, image_url)
	values(@movie_name, CAST(@release_date as date), @rated, @runtime, @director_id, @image_url)
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
	values (@genre_name)
end;

-- insert movie_genre
create or alter proc usp_insert_movie_genre @movie_id int, @genre_id int
as
begin
	insert into Movie_Genre(movie_id, genre_id)
	values (@movie_id, @genre_id)
end;

