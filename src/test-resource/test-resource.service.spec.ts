import { Test, TestingModule } from '@nestjs/testing';
import { TestResourceService } from './test-resource.service';

describe('TestResourceService', () => {
  let service: TestResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestResourceService],
    }).compile();

    service = module.get<TestResourceService>(TestResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
