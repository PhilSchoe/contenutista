import { User } from "@prisma/client";
import { UserEntity } from "./entities/user.entity";

export function toEntity(user: User): UserEntity {
  return new UserEntity(user.id, user.name, user.email);
}
