import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1714140700071 implements MigrationInterface {
    name = 'Migration1714140700071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie_categories_category" ("movie_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_33f628b202ce0060ea37fed15be" PRIMARY KEY ("movie_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_45d7c75a238f5b4544b7668819" ON "movie_categories_category" ("movie_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a265bf6ba018954600e4364899" ON "movie_categories_category" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "movie_categories_category" ADD CONSTRAINT "FK_45d7c75a238f5b4544b76688190" FOREIGN KEY ("movie_id") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movie_categories_category" ADD CONSTRAINT "FK_a265bf6ba018954600e43648994" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie_categories_category" DROP CONSTRAINT "FK_a265bf6ba018954600e43648994"`);
        await queryRunner.query(`ALTER TABLE "movie_categories_category" DROP CONSTRAINT "FK_45d7c75a238f5b4544b76688190"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a265bf6ba018954600e4364899"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_45d7c75a238f5b4544b7668819"`);
        await queryRunner.query(`DROP TABLE "movie_categories_category"`);
    }

}
