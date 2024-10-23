import dataSource from "../../config/typeorm.config";
import { Permission } from "../../model/permission.entity";

export const permissionRepository = dataSource.getRepository(Permission).extend({
  async addPermissionAsync(
    permissionData: Partial<Permission>
  ): Promise<Permission | null> {
    const newPermission = this.create(permissionData);
    return this.save(newPermission);
  },

  async findAllAsync(): Promise<Permission[]> {
    return this.find();
  },
  async findByNameAsync(name: string | undefined): Promise<Permission| null> {
    return this.findOneBy({ name });
  },
  findByIdAsync(id: string): Promise<Permission | null> {
    return this.findOneBy({ id });
  }
});
