import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717449744608 implements MigrationInterface {
  name = 'Migration1717449744608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "description" character varying(256), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_5c1f57a0b653c037769afd964f2" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(128) NOT NULL, "description" character varying(2048) NOT NULL, "has_reservations_available" boolean NOT NULL DEFAULT false, "release_date" date NOT NULL, "rate" integer NOT NULL DEFAULT '0', "duration" integer NOT NULL DEFAULT '0', "poster_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_45bad8775507521a63a69bd3f01" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie_category" ("movie_uid" uuid NOT NULL, "category_uid" uuid NOT NULL, CONSTRAINT "PK_4a8b73cd60f8af8a80767b278fd" PRIMARY KEY ("movie_uid", "category_uid"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_29aad0f7715bc9c78377afbc0f" ON "movie_category" ("movie_uid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d1a9bd75479bc9a29259e6f493" ON "movie_category" ("category_uid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_category" ADD CONSTRAINT "FK_29aad0f7715bc9c78377afbc0f3" FOREIGN KEY ("movie_uid") REFERENCES "movie"("uid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_category" ADD CONSTRAINT "FK_d1a9bd75479bc9a29259e6f4937" FOREIGN KEY ("category_uid") REFERENCES "category"("uid") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_category" DROP CONSTRAINT "FK_d1a9bd75479bc9a29259e6f4937"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_category" DROP CONSTRAINT "FK_29aad0f7715bc9c78377afbc0f3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d1a9bd75479bc9a29259e6f493"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_29aad0f7715bc9c78377afbc0f"`,
    );
    await queryRunner.query(`DROP TABLE "movie_category"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
