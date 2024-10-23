import { Post } from "../../model/post.entity";
import dataSource from "../../config/typeorm.config";

export const postRepository = dataSource.getRepository(Post).extend({
  async findAllAsync(): Promise<Post[]> {
    return this.find();
  },
  async findByTitleAsync(title: string | undefined): Promise<Post | null> {
    return this.findOneBy({ title });
  },
  async findByIdAsync(id: string): Promise<Post | null> {
    return this.findOneBy({ id: id });
  },

  async createPostAsync(postData: Partial<Post>): Promise<Post> {
    const newPost = this.create(postData);
    return this.save(newPost);
  },
  async updatePostAsync(id: string, updateData: Partial<Post>): Promise<Post | null> {
    await this.update(id, updateData);
    return this.findOneBy({ id });
  },
});
