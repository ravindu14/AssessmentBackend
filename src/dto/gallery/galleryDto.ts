import { IsString, ValidateNested } from "class-validator";
import { Expose, Type } from "class-transformer";

export class GalleryDto {
  @Expose()
  @IsString()
  public id: string;

  @Expose()
  @ValidateNested()
  public favorites: any[]
}

class FavoritesDto {
  @Expose()
  @IsString()
  public id: string;

  @Expose()
  @IsString()
  public message: string;

  @Expose()
  @IsString()
  public picture: string;

  @Expose()
  @IsString()
  public pictureSmall: string;

  @Expose()
  @IsString()
  public pictureMedium: string;

  @Expose()
  @IsString()
  public pictureStored: string;

  @Expose()
  @IsString()
  public timestamp: string;
}