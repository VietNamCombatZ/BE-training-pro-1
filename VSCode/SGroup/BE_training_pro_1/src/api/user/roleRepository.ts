import { Role} from "../../model/role.entity";
import dataSource from "../../config/typeorm.config";

export const roleRepository = dataSource.getRepository(Role).extend({
  async findAllAsync(): Promise<Role[]> {
    return this.find();
  },
  async addRoleAsync(roleData: Partial<Role>): Promise<Role | null> {
    const newRole = this.create(roleData);
    return this.save(newRole);
  },

  async findByNameAsync(roleName: string | undefined): Promise<Role| null> {
    return this.findOneBy({ roleName});
  },
});
