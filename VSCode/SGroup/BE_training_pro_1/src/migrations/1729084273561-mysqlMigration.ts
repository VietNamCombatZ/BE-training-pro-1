import { MigrationInterface, QueryRunner } from "typeorm";

export class MysqlMigration1729084273561 implements MigrationInterface {
    name = 'MysqlMigration1729084273561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`accessToken\` \`accessToken\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`accessToken\` \`accessToken\` varchar(255) NOT NULL`);
    }

}
