import { Request, Response, NextFunction, Router } from "express";

import Controller from "../../shared/interfaces/controller.interface";
import { InternalServerError, InvalidRequestException } from "../../shared/exceptions/request.exception";
import { DataMissingException } from "../../exceptions/gallery.exception";
import { GalleryService } from "../../services/gallery/galleryService";
import { GalleryDto } from "../../dto/gallery/galleryDto";
import { plainToClass } from "class-transformer";

export class GalleryController implements Controller {

  private galleryService;
  constructor(galleryService: GalleryService) {
    this.galleryService = galleryService;
  }


  /**
   * fetch instance from gallery db using the userID
   * @param request 
   * @param response 
   * @param nextFunction 
   * @returns {Object}
   */
  public getGalleryById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = request.params.id;

      if (!userId) {
       return next(new InvalidRequestException());
      }

      const data = await this.galleryService.getUserGallery(userId);

      if (!data) {
        return response.status(400).json({ success: false });
      }
      return response.status(200).json({ success: true, data });
    } catch (error) {
      return next(new InternalServerError());
    }
  }

  /**
   * create or update the existing instance of user in the gallery DB
   * @param request 
   * @param response 
   * @param next 
   * @returns {Object}
   */
  public createOrUpdateGallery = async (request: Request, response: Response, next: NextFunction) => {
    try {

      const galleryDto: GalleryDto = plainToClass(GalleryDto, request.body, { enableImplicitConversion: true });

      if (!galleryDto.id) {
        return next(new DataMissingException());
      }

      const data = await this.galleryService.createGallery(galleryDto);
      if (!data) {
        return response.status(400).json({ success: false });
      }
      return response.status(200).json({ success: true, data });
    } catch (error) {
      return next(new InternalServerError());
    }
  }
}

export const createGalleryController =  (): GalleryController => {
  return new GalleryController(new GalleryService())
}