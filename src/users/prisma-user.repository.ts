import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { UserEntity } from "./entities/user.entity";
import { User } from "@prisma/client";
import { PrismaService } from "../db/prisma.service";
import { toEntity } from "./users.mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, email: string): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: { name, email } as User,
    });

    return toEntity(user);
  }
  findById(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
}
