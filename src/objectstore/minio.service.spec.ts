import { Test, TestingModule } from "@nestjs/testing";
import { MinioService } from "./minio.service";
import { ConfigService } from "@nestjs/config";
import { InternalServerErrorException } from "@nestjs/common";

// Mock Minio client and its methods
const mockPresignedUrl = "http://mock-presigned-url";
const mockMinioClient = {
  presignedPutObject: jest.fn().mockResolvedValue(mockPresignedUrl),
  bucketExists: jest.fn().mockResolvedValue(true),
  makeBucket: jest.fn(),
};

jest.mock("minio", () => {
  return {
    Client: jest.fn(() => mockMinioClient),
  };
});

describe("MinioService", () => {
  let service: MinioService;

  const mockConfigService = {
    getOrThrow: jest.fn((key) => {
      const config = {
        MINIO_ENDPOINT: "localhost",
        MINIO_PORT: "9000",
        MINIO_USE_SSL: "false",
        MINIO_ACCESS_KEY: "minioadmin",
        MINIO_SECRET_KEY: "minioadmin",
        MINIO_DEFAULT_BUCKET: "test-bucket",
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MinioService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<MinioService>(MinioService);
    // Manually initialize the client since onModuleInit is not called automatically in unit tests
    service["initMinioClient"]();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create put object URL", async () => {
    // Given
    const objectName = "test-object";

    // When
    const result = await service.getPutObjectUrl(objectName);

    // Then
    expect(mockMinioClient.presignedPutObject).toHaveBeenCalledWith(
      "test-bucket",
      expect.stringMatching(new RegExp(`${objectName}-[a-zA-Z0-9_-]{21}`)),
    );
    expect(result).toHaveProperty("url", mockPresignedUrl);
    expect(result).toHaveProperty("objectStoreId");
    expect(result.objectStoreId).toMatch(
      new RegExp(`${objectName}-[a-zA-Z0-9_-]{21}`),
    );
  });

  it("should throw InternalServerErrorException on getting put object url error", async () => {
    // Given
    const errorText = "Test error";
    mockMinioClient.presignedPutObject.mockRejectedValue(new Error(errorText));

    // When
    const objectName = "test-object";
    const promise = service.getPutObjectUrl(objectName);

    // Then
    await expect(promise).rejects.toThrow(
      new InternalServerErrorException(
        `Error generating URL for ${objectName}. Error details: ${errorText}`,
      ),
    );
  });
});
