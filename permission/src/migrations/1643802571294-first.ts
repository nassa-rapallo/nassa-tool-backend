import {MigrationInterface, QueryRunner} from "typeorm";

export class first1643802571294 implements MigrationInterface {
    name = 'first1643802571294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "section" character varying NOT NULL, "actionId" character varying NOT NULL, "actionName" character varying NOT NULL, "decription" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_54b459f3ffe8a2420c1bb0aea5a" UNIQUE ("actionId"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "section"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP CONSTRAINT "UQ_b6fc8481529573a4569e95c118b"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "action"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "rule" ADD "groupId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rule" ADD "cluster" text NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "rule" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rule" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "rule" ADD "permissionId" uuid`);
        await queryRunner.query(`ALTER TABLE "rule" ADD CONSTRAINT "FK_6cc3679f17363819802aa306e60" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rule" DROP CONSTRAINT "FK_6cc3679f17363819802aa306e60"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "cluster"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "rule" ADD "roles" text array NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rule" ADD "action" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rule" ADD CONSTRAINT "UQ_b6fc8481529573a4569e95c118b" UNIQUE ("action")`);
        await queryRunner.query(`ALTER TABLE "rule" ADD "section" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
