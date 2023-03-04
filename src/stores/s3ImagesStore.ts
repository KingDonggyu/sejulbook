import { create } from 'zustand';

interface S3ImagesState {
  imageSet: Set<string>;
  addImage: (url: string) => void;
  emptyImages: () => void;
}

const s3ImagesStore = create<S3ImagesState>((set) => ({
  imageSet: new Set<string>(),

  addImage: (url: string) => {
    set((state) => {
      const imageSet = new Set(state.imageSet);
      imageSet.add(url);
      return { imageSet };
    });
  },

  emptyImages: () => {
    set({
      imageSet: new Set<string>(),
    });
  },
}));

export default s3ImagesStore;
