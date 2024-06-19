import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1718745403844 implements MigrationInterface {
  name = 'Migration1718745403844';
  cinema = [
    { name: 'Pathé' },
    { name: 'Gaumont' },
    { name: 'UGC' },
    { name: 'Mega CGR' },
    { name: 'Kinepolis' },
    { name: 'Cinéville' },
    { name: 'Cinéma CGR' },
    { name: 'Cinéma UGC' },
    { name: '3 Palmes' },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "reservation" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_uid" character varying NOT NULL, "rank" integer NOT NULL, "_status" character varying NOT NULL DEFAULT 'pending', "nb_seats" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "expires_at" TIMESTAMP, "seance_uid" uuid, CONSTRAINT "PK_cf1c9ec820942f971f80da776b8" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "room" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "seats" integer NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cinema_uid" uuid, CONSTRAINT "PK_c2bf4b6a4547ce16ff6bf7c1f5f" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "seance" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "movie" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "room_uid" uuid, "cinema_uid" uuid, CONSTRAINT "PK_2fed8d785bee2aa47c4e5d8929d" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cinema" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dc22526eaf86fdf673df6ddca36" PRIMARY KEY ("uid"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_ad058d061dc71fa1f5a5ef785ce" FOREIGN KEY ("seance_uid") REFERENCES "seance"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" ADD CONSTRAINT "FK_6b61d54e90b9ccebd99c8ba0a05" FOREIGN KEY ("cinema_uid") REFERENCES "cinema"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seance" ADD CONSTRAINT "FK_4ff4c34274eeefbb35dcc6db9af" FOREIGN KEY ("room_uid") REFERENCES "room"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "seance" ADD CONSTRAINT "FK_7883b7232accdb7326acef3634f" FOREIGN KEY ("cinema_uid") REFERENCES "cinema"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    for (const cinema of this.cinema) {
      // Insert cinema with 2 rooms
      await queryRunner.query(
        `INSERT INTO "cinema" ("name") VALUES ('${cinema.name}')`,
      );
      const cinemaRecord = await queryRunner.query(
        `SELECT * FROM "cinema" WHERE "name" = '${cinema.name}'`,
      );
      const cinemaUid = cinemaRecord[0].uid;
      await queryRunner.query(
        `INSERT INTO "room" ("seats", "name", "cinema_uid") VALUES (100, 'Room 1', '${cinemaUid}')`,
      );
      await queryRunner.query(
        `INSERT INTO "room" ("seats", "name", "cinema_uid") VALUES (80, 'Room 2', '${cinemaUid}')`,
      );
      // Insert seance for each room

      const room1 = await queryRunner.query(
        `SELECT * FROM "room" WHERE "name" = 'Room 1'`,
      );
      const room1Uid = room1[0].uid;
      await queryRunner.query(
        `INSERT INTO "seance" ("movie", "date", "room_uid", "cinema_uid") VALUES ('Matrix', '2022-01-01 20:00:00', '${room1Uid}', '${cinemaUid}')`,
      );

      const room2 = await queryRunner.query(
        `SELECT * FROM "room" WHERE "name" = 'Room 2'`,
      );
      const room2Uid = room2[0].uid;

      await queryRunner.query(
        `INSERT INTO "seance" ("movie", "date", "room_uid", "cinema_uid") VALUES ('ToyStory', '2022-01-01 20:00:00', '${room2Uid}', '${cinemaUid}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "seance" DROP CONSTRAINT "FK_7883b7232accdb7326acef3634f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "seance" DROP CONSTRAINT "FK_4ff4c34274eeefbb35dcc6db9af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "room" DROP CONSTRAINT "FK_6b61d54e90b9ccebd99c8ba0a05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_ad058d061dc71fa1f5a5ef785ce"`,
    );
    await queryRunner.query(`DROP TABLE "cinema"`);
    await queryRunner.query(`DROP TABLE "seance"`);
    await queryRunner.query(`DROP TABLE "room"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
  }
}
