import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResourcesEntity1737441257293 implements MigrationInterface {
  name = "CreateResourcesEntity1737441257293";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resource" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "detail" varchar NOT NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "resource"`);
  }
}
