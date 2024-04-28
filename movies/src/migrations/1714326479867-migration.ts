import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Movies = require('./movies-2020s.json');
export class Migration1714326479867 implements MigrationInterface {
  name = 'Migration1714326479867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const randomRating = () => Math.floor(Math.random() * 5) + 1;
    const genresAdded: any[] = [];
    Movies.forEach(async (movie: any) => {
      const movieGenresIds: any[] = [];
      movie.genres.forEach(async (genre: any) => {
        if (!genresAdded.includes(genre)) {
          const genreId = uuidv4();
          await queryRunner.query(
            `INSERT INTO "category" ("id", "name") VALUES ('${genreId}', '${genre}') ON CONFLICT DO NOTHING`,
          );
          genresAdded.push({ name: genre, id: genreId });
        }
        movieGenresIds.push(genresAdded.find((g) => g.name === genre).id);
      });

      const releaseDate = new Date(`${movie.year}`).toISOString();
      const movieId = uuidv4();
      await queryRunner.query(
        `INSERT INTO "movie" ("id", "title", "description", "release_date", "rating", "poster_url") VALUES ( '${movieId}',
            '${movie.title}', '${
              movie.extract
            }', '${releaseDate}', ${randomRating()}, '${movie.thumbnail}')`,
      );

      movieGenresIds.forEach(async (genreId: any) => {
        await queryRunner.query(
          `INSERT INTO "movie_category" ("movie_id", "category_id") VALUES ('${movieId}', '${genreId}')`,
        );
      });
    });
  }

  public async down(): Promise<void> {
    return;
  }
}
