import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
  create(email: string, name: string): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
}
