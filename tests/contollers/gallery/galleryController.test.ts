import 'reflect-metadata';
import { GalleryController } from '../../../src/controllers/gallery';
import {InvalidRequestException} from "../../../src/shared/exceptions/request.exception";
import {DataMissingException} from "../../../src/exceptions/gallery.exception";

const galleryService = {
    createGallery: jest.fn().mockResolvedValueOnce( undefined ),
    getUserGallery: jest.fn().mockResolvedValueOnce( [] ),
};

describe("GalleryController", () => {
    const next = jest.fn();

    beforeEach(() => {
       next.mockClear();
    });

    it("will throw an exception with empty user ID", async () => {
        const galleryController = new GalleryController(galleryService as any)
        await galleryController.getGalleryById({ params: {id: undefined} }, {}, next);
        expect(next).toBeCalledWith(new InvalidRequestException());
        expect(next).toHaveBeenCalledTimes(1);
    });

    it("will called gallery service with valid user Id", async () => {
        const galleryController = new GalleryController(galleryService as any)
        await galleryController.getGalleryById({ params: {id: 100} }, {}, next);
        expect(galleryService.getUserGallery).toHaveBeenCalledTimes(1);
        expect(galleryService.getUserGallery).toBeCalledWith(100);
    });

    it("will send bad request response with empty data", async () => {
        const mockedGalleryService = {
            createGallery: async () => Promise.resolve(undefined),
            getUserGallery: jest.fn().mockResolvedValueOnce( [] ),
        };

        const response = {
            status: jest.fn(),
        }

        const galleryController = new GalleryController(mockedGalleryService as any)
        await galleryController.getGalleryById({ params: {id: 100} }, response, next);
        expect(response.status).toBeCalled();
    });

    it("will throw an exception with empty payload", async () => {
        const galleryController = new GalleryController(galleryService as any)
        await galleryController.createOrUpdateGallery({ body: {
                id: undefined
            } }, {}, next);
        expect(next).toBeCalledWith(new DataMissingException());
        expect(next).toHaveBeenCalledTimes(1);
    });

    it("will create gallery with valid payload", async () => {
        const galleryController = new GalleryController(galleryService as any)
        await galleryController.createOrUpdateGallery({ body: {
                id: "465465",
                favorites: [
                    {
                        "id": 204900001,
                        "message": "",
                        "picture": "https://placeimg.com/2560/2560/any",
                        "pictureSmall": "",
                        "pictureMedium": "",
                        "pictureStored": "",
                        "timestamp": 1578391381
                    }
                ]
            } }, {}, next);
        expect(galleryService.createGallery).toHaveBeenCalledTimes(1);
        expect(galleryService.createGallery).toBeCalledWith({
            id: "465465",
            favorites: [
                {
                    "id": 204900001,
                    "message": "",
                    "picture": "https://placeimg.com/2560/2560/any",
                    "pictureSmall": "",
                    "pictureMedium": "",
                    "pictureStored": "",
                    "timestamp": 1578391381
                }
            ]
        });
    });
});