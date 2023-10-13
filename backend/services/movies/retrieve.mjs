import { query } from "../../app.js";

export default async function retrieve() {
  const queryString = `SELECT m.movie_id, m.movie_name, m.rated, 
                          CAST(m.release_date AS nvarchar) AS release_date,
                              m.runtime, m.file_path, d.director_name,
                              (SELECT ROUND(AVG(ISNULL(CAST(r.rating AS float), 0)), 2)
                              FROM Ratings r
                              WHERE r.movie_id = m.movie_id) AS avg_rating,
                              STRING_AGG(g.genre_name, ', ') AS genres
                          FROM Movies m
                          INNER JOIN Directors d ON m.director_id = d.director_id
                          INNER JOIN Movie_Genre mg ON m.movie_id = mg.movie_id
                          INNER JOIN Genre g ON g.genre_id = mg.genre_id
                          GROUP BY m.movie_id, m.movie_name, m.rated, m.runtime, m.release_date, 
                          d.director_name, m.file_path`;

  let result = await query(queryString);

  return result?.recordset;
}
