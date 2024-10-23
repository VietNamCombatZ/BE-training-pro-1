import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUser1729669865166 implements MigrationInterface {
    name = 'AddRoleToUser1729669865166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`role\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`role\``);
    }

}
