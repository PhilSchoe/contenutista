import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "../service/users.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";

describe("UsersController", () => {
  let controller: UsersController;

  const mockUser: UserEntity = {
    id: 1,
    email: "test@example.com",
    name: "Test User",
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should save a user to the database", async () => {
    // Given
    const dto: CreateUserDto = { email: "test@example.com", name: "Test User" };

    // When
    const result = await controller.create(dto);

    // Then
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    expect(mockUsersService.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUser);
  });
});
