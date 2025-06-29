import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { PrismaUserRepository } from "../repository/prisma-user.repository";
import { USERS_REPOSITORY } from "../users.constants";
import { PrismaModule } from "../../db/prisma.module";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../repository/users.repository";
import { CreateUserDto } from "../dto/create-user.dto";

describe("UsersService", () => {
  let service: UsersService;
  let usersRepository: UserRepository;

  const mockUser: UserEntity = {
    id: 1,
    email: "test@example.com",
    name: "Test User",
  };

  const mockUsersRepository = {
    create: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        UsersService,
        {
          provide: USERS_REPOSITORY,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UserRepository>(USERS_REPOSITORY);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a user", async () => {
    // Given
    const dto: CreateUserDto = { email: "test@example.com", name: "Test User" };

    // When
    const result = await service.create(dto);

    // Then
    expect(usersRepository.create).toHaveBeenCalledWith(dto.name, dto.email);
    expect(usersRepository.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUser);
  });
});
