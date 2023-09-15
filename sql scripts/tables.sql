use movie_repo;

CREATE TABLE Directors (
director_id int not null identity(1,1) primary key,
director_name nvarchar(30) not null)

CREATE TABLE Movies (
movie_id int not null identity(1,1) primary key,
movie_name nvarchar(50) not null,
--[year] int not null,
file_path nvarchar(50),
release_date date,
rated nvarchar(5),
runtime int,
director_id int not null foreign key references Directors(director_id))

CREATE TABLE Users (
[user_id] int not null identity(1,1) primary key,
username nvarchar(20) not null unique,
[password] nvarchar(60) not null)

CREATE TABLE Ratings (
rating_id int not null identity(1,1) primary key,
[user_id] int not null foreign key references Users([user_id]),
movie_id int not null foreign key references Movies(movie_id),
rating int)

CREATE TABLE Genre (
genre_id int not null identity(1,1) primary key,
genre_name nvarchar(10) not null)

CREATE TABLE Movie_Genre (
movie_genre_id int not null identity(1,1) primary key,
movie_id int not null foreign key references Movies(movie_id),
genre_id int not null foreign key references Genre(genre_id))
