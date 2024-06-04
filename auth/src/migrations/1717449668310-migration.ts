import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1717449668310 implements MigrationInterface {
  name = 'Migration1717449668310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(200) NOT NULL, "password" character varying NOT NULL, "roles" character varying NOT NULL DEFAULT '["ROLE_USER"]', "status" character varying NOT NULL DEFAULT 'open', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`,
    );
    const password = await bcrypt.hash('admin', 10);
    await queryRunner.query(
      `INSERT INTO "user" ("login", "password", "roles") VALUES ('admin', '${password}', '["ROLE_ADMIN"]')`,
    );
    const passwordUser = await bcrypt.hash('user', 10);
    await queryRunner.query(
      `INSERT INTO "user" ("login", "password", "roles") VALUES ('user', '${passwordUser}', '["ROLE_USER"]')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
