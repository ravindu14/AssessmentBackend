import { Router } from "express";
import { createGalleryController } from "../controllers/gallery";

export const initRoutes = () => {
    const router = new Router();

    // Gallery
    const path = "/gallery";
    const galleryController = createGalleryController();
    router.get(`${path}/:id`, galleryController.getGalleryById);
    router.put(`${path}`, galleryController.createOrUpdateGallery);

    return router;
}