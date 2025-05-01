import { Test, TestingModule } from '@nestjs/testing';
import { TestResourceController } from './test-resource.controller';
import { TestResourceService } from './test-resource.service';

describe('TestResourceController', () => {
  let controller: TestResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestResourceController],
      providers: [TestResourceService],
    }).compile();

    controller = module.get<TestResourceController>(TestResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
