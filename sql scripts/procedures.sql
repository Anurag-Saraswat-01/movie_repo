insert into [dbo].[Users](username, [password])
values ('anurag', '1234');

select * from Users;

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