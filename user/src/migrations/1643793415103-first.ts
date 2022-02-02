import { MigrationInterface, QueryRunner } from 'typeorm';

export class first1643793415103 implements MigrationInterface {
  name = 'first1643793415103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."link_type_enum" AS ENUM('CONFIRM', 'PASSWORD')`,
    );
    await queryRunner.query(
      `CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "link" character varying NOT NULL, "is_used" boolean NOT NULL DEFAULT false, "type" "public"."link_type_enum" NOT NULL, CONSTRAINT "UQ_ff4145f6e8c3b7ee26e5414d2bc" UNIQUE ("link"), CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "changing_password" boolean NOT NULL DEFAULT false, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "groupId" character varying NOT NULL, "roleId" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "link"`);
    await queryRunner.query(`DROP TYPE "public"."link_type_enum"`);
  }
}
