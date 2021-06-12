import { Schema, model, Document } from 'mongoose'

interface IFavorites extends Document {
  id: string,
  message: string,
  picture: string,
  pictureSmall: string,
  pictureMedium: string,
  pictureStored: string,
  timestamp: string
};

interface IGallery extends Document {
  id: string,
  favorites: IFavorites[],
};

const gallerySchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  favorites: {
    type: Array,
    default: [],
  }
}, {
  timestamps: true,
});

export default model<IGallery>('gallery', gallerySchema);

