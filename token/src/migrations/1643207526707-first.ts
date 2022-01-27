import { MigrationInterface, QueryRunner } from 'typeorm';

export class first1643207526707 implements MigrationInterface {
  name = 'first1643207526707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_token" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_token"`);
  }
}
