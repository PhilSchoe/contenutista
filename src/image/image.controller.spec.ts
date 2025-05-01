import { Test, TestingModule } from "@nestjs/testing";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

describe("ImageController", () => {
  let imageController: ImageController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [ImageService],
    }).compile();

    imageController = app.get<ImageController>(ImageController);
  });

  describe("getImage", () => {
    it("should return image from endpoint string", () => {
      expect(imageController.getImage()).toBe(
        "Image endpoint from ImageService",
      );
    });
  });
});
