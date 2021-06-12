import { GalleryManagerRepository } from "../../dal/gallery/galleryManagerRepository";
import { GalleryDto } from "../../dto/gallery/galleryDto";

export class GalleryService {
  private galleryRepo: GalleryManagerRepository;

  constructor() {
    this.galleryRepo = new GalleryManagerRepository();
  }

  public createGallery = async (galleryDto: GalleryDto): Promise<any> => {
    return await this.galleryRepo.createOrUpdateGallery(galleryDto);
  }

  public getUserGallery = async (userId: string): Promise<GalleryDto> => {
    return await this.galleryRepo.getGalleryById(userId);
  }
}
