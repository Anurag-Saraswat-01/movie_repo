-- register new user
create or alter proc usp_register_user @username nvarchar(20), @password nvarchar(60)
as
begin
	insert into [dbo].[Users]([username], [password])
	values(@username, @password)
end;

-- get password of user for login
create or alter proc usp_get_password @username nvarchar(20), @password nvarchar(60) out
as
begin
	select @password = [password]
	from [dbo].[Users]
	where [username] = @username
end;

-- insert new director
create or alter proc usp_insert_director @director_name nvarchar(30)
as
begin
	insert into [dbo].[Directors](director_name)
	values (@director_name)
end;