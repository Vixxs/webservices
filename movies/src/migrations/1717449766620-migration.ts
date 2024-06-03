import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import Movies = require('./movies-2020s.json');

export class Migration1717449766620 implements MigrationInterface {
  name = 'Migration1717449766620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const randomRate = () => Math.floor(Math.random() * 5) + 1;
    const randomDuration = () => Math.floor(Math.random() * 240) + 1;
    const genresAdded: any[] = [];
    Movies.forEach(async (movie: any) => {
      const movieGenresUids: any[] = [];
      movie.genres.forEach(async (genre: any) => {
        if (!genresAdded.includes(genre)) {
          const genreUid = uuidv4();
          await queryRunner.query(
            `INSERT INTO "category" ("uid", "name") VALUES ('${genreUid}', '${genre}') ON CONFLICT DO NOTHING`,
          );
          genresAdded.push({ name: genre, uid: genreUid });
        }
        movieGenresUids.push(genresAdded.find((g) => g.name === genre).uid);
      });

      const releaseDate = new Date(`${movie.year}`).toISOString();
      const movieUid = uuidv4();
      await queryRunner.query(
        `INSERT INTO "movie" ("uid", "name", "description", "release_date", "rate", "poster_url", "duration") VALUES ( '${movieUid}',
            '${movie.title}', '${
              movie.extract
            }', '${releaseDate}', ${randomRate()}, '${
              movie.thumbnail
            }', ${randomDuration()})`,
      );

      movieGenresUids.forEach(async (genreUid: any) => {
        await queryRunner.query(
          `INSERT INTO "movie_category" ("movie_uid", "category_uid") VALUES ('${movieUid}', '${genreUid}')`,
        );
      });
    });
  }

  public async down(): Promise<void> {
    return;
  }
}
