import { Injectable } from "@nestjs/common";

@Injectable()
export class ImageService {
  getImage(): string {
    return "Image endpoint from ImageService";
  }
}
