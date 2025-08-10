import { MinioService } from "../objectstore/minio.service";
import { FilesController } from "./files.controller";
import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { BadRequestException } from "@nestjs/common";

describe("FilesController", () => {
  let controller: FilesController;

  const mockPresignedUrl = "http://example.com/presigned-url";
  const mockMinioService = {
    getPutObjectUrl: jest.fn().mockResolvedValue(mockPresignedUrl),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        { provide: MinioService, useValue: mockMinioService },
        ConfigService,
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a presigned URL successfully", async () => {
    // Given;
    const dto = { objectName: "test-object" };

    // When
    const result = await controller.createPresignedUrl(dto);

    // Then
    expect(mockMinioService.getPutObjectUrl).toHaveBeenCalledWith(
      dto.objectName,
      undefined,
    );
    expect(mockMinioService.getPutObjectUrl).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPresignedUrl);
  });

  it("should throw bad request error if objectName is not provided", async () => {
    // Given
    const dto = { objectName: "" };

    // When & Then
    await expect(controller.createPresignedUrl(dto)).rejects.toThrow(
      new BadRequestException("Object name is required"),
    );
  });
});
