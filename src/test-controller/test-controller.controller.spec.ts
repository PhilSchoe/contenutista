import { Test, TestingModule } from '@nestjs/testing';
import { TestControllerController } from './test-controller.controller';

describe('TestControllerController', () => {
  let controller: TestControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestControllerController],
    }).compile();

    controller = module.get<TestControllerController>(TestControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
