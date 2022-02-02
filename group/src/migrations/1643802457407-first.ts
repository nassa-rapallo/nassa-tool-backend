import {MigrationInterface, QueryRunner} from "typeorm";

export class first1643802457407 implements MigrationInterface {
    name = 'first1643802457407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."role_type_enum" AS ENUM('admin', 'member', 'none')`);
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" "public"."role_type_enum" DEFAULT 'none', "position" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "groupId" uuid, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "codeName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8a45300fd825918f3b40195fbdc" UNIQUE ("name"), CONSTRAINT "UQ_c13ca26406d3e9be800054b9a4c" UNIQUE ("codeName"), CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_3a26994d34035aaa72db4f05425" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3a26994d34035aaa72db4f05425"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TYPE "public"."role_type_enum"`);
    }

}
