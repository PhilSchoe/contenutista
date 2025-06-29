import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { USERS_REPOSITORY } from "./users.constants";
import { PrismaUserRepository } from "./prisma-user.repository";
import { PrismaModule } from "src/db/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class UsersModule {}
