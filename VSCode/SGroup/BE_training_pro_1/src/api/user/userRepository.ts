import { User } from '../../model/user.entity';
import dataSource from '../../config/typeorm.config';

export const userRepository = dataSource.getRepository(User).extend({
  async findAllAsync(): Promise<User[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<User | null> {
    return this.findOneBy({ id: id });
  },

  async createUserAsync(userData: Partial<User>): Promise<User> {
    const newUser = this.create(userData);
    return this.save(newUser);
  },

  async updateUserAsync(id: string, updateData: Partial<User>): Promise<User | null> {
    await this.update(id, updateData);
    return this.findOneBy({ id });
  },

  async findByEmailAsync(email: string | undefined): Promise<User | null> {
    return this.findOneBy({ email });
  },
  
  async addTokenAsync(id: string, tokenData: any): Promise<User | null> {
    await this.update(id,  tokenData);
    return this.findOneBy({ id });
  }
});
