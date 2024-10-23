import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyPost1729678404329 implements MigrationInterface {
    name = 'ModifyPost1729678404329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` ADD UNIQUE INDEX \`IDX_e28aa0c4114146bfb1567bfa9a\` (\`title\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP INDEX \`IDX_e28aa0c4114146bfb1567bfa9a\``);
    }

}
