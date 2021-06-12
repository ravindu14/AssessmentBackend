import { GalleryDto } from "../../dto/gallery/galleryDto";
import GallerySchema from "./model";

export class GalleryManagerRepository {
  private model: any;

  constructor() {
    this.model = GallerySchema;
  }

  public createOrUpdateGallery = async (galleryDto: GalleryDto) => {
    const galleyToBeUpdated = await this.model.findOne({ id: galleryDto.id });

    if (galleyToBeUpdated !== null) {
      const updatedGallery = await this.model.findOneAndUpdate({ id: galleryDto.id }, { $set: galleryDto }, { new: true });
      return updatedGallery;
    }

    const createdGallery = await this.model.create(galleryDto);
    return createdGallery;
  }

  public getGalleryById = async (userId: string) => {
    const data = await this.model.findOne({ id: userId });

    if (data) return data;
    return null;
  }
}