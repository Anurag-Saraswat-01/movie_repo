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

