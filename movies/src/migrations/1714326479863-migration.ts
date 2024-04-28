import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1714326479863 implements MigrationInterface {
  name = 'Migration1714326479863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "description" character varying(256), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(128) NOT NULL, "description" character varying(2048) NOT NULL, "release_date" date NOT NULL, "rating" integer, "poster_url" character varying, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_category" ("movie_id" uuid NOT NULL, "category_id" uuid NOT NULL, CONSTRAINT "PK_863112691ec73f8eddee559d777" PRIMARY KEY ("movie_id", "category_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_772fbff485e9541a9b4d7fec88" ON "movie_category" ("movie_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_22bbd4d33dbc49b240df412d28" ON "movie_category" ("category_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_category" ADD CONSTRAINT "FK_772fbff485e9541a9b4d7fec888" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_category" ADD CONSTRAINT "FK_22bbd4d33dbc49b240df412d28e" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_category" DROP CONSTRAINT "FK_22bbd4d33dbc49b240df412d28e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_category" DROP CONSTRAINT "FK_772fbff485e9541a9b4d7fec888"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_22bbd4d33dbc49b240df412d28"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_772fbff485e9541a9b4d7fec88"`,
    );
    await queryRunner.query(`DROP TABLE "movie_category"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
