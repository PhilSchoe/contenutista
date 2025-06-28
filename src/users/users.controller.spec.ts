import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";

describe("UsersController", () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUser: UserEntity = {
    id: 1,
    email: "test@example.com",
    name: "Test User",
    // ...add other properties if needed...
  };

  const mockUsersService = {
    create: jest.fn().mockResolvedValue(mockUser),
    // ...other methods can be mocked as needed...
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
    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should save a user to the database", async () => {
    const dto: CreateUserDto = { email: "test@example.com", name: "Test User" };
    const result = await controller.create(dto);

    console.log(result);

    expect(usersService.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockUser);
  });
});
