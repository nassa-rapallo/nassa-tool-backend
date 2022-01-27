import { MigrationInterface, QueryRunner } from 'typeorm';

export class first1643207543393 implements MigrationInterface {
  name = 'first1643207543393';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "section" character varying NOT NULL, "action" character varying NOT NULL, "roles" text array NOT NULL, CONSTRAINT "UQ_b6fc8481529573a4569e95c118b" UNIQUE ("action"), CONSTRAINT "PK_a5577f464213af7ffbe866e3cb5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rule"`);
  }
}
