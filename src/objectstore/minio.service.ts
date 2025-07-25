import { Injectable, OnModuleInit } from "@nestjs/common";
import * as Minio from "minio";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MinioService implements OnModuleInit {
  private client: Minio.Client;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = new Minio.Client({
      endPoint: this.configService.getOrThrow("MINIO_ENDPOINT"),
      port: this.configService.getOrThrow("MINIO_PORT"),
      useSSL: this.configService.getOrThrow("MINIO_USE_SSL"),
      accessKey: this.configService.getOrThrow("MINIO_ACCESS_KEY"),
      secretKey: this.configService.getOrThrow("MINIO_SECRET_KEY"),
    });
  }
}
