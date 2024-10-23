import { Role} from "../../model/role.entity";
import { Permission } from "../../model/permission.entity";
// import CreateRolePermissionRequest from "../auth/auth.interface";
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
  async findByIdAsync(id: string): Promise<Role | null> {
    return this.findOneBy({ id });
  },
  async addPermissionToRoleAsync(role: Role, permission: Permission): Promise< Role| null> {
    // 
    // return this.create({roleId: role.id, permissionId: permission.id});
    if (!role.permissions) {
      role.permissions = [];
    }

    // Add the permission to the role's permissions array
    role.permissions.push(permission);

    // Save the role, which will also update the join table
    return await this.save(role);
  }
});
