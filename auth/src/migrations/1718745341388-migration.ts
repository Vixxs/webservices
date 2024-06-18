import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1718745341388 implements MigrationInterface {
  name = 'Migration1718745341388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(200) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    const password = await bcrypt.hash('admin', 10);
    await queryRunner.query(
      `INSERT INTO "user" ("login", "password", "roles", "email") VALUES ('admin', '${password}', '["ROLE_ADMIN"]', 'user@user.fr')`,
    );
    const passwordUser = await bcrypt.hash('user', 10);
    await queryRunner.query(
      `INSERT INTO "user" ("login", "password", "roles", "email") VALUES ('user', '${passwordUser}', '["ROLE_USER"]', 'admin@admin.fr')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
  }
}
