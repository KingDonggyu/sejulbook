import getS3DomainAddress from '@/utils/getS3DomainAddress';
import { create } from 'zustand';

interface S3ImageKeyState {
  imageKeySet: Set<string>;
  addImageKey: (url: string) => void;
  deleteImageKey: (url: string) => void;
  empty: () => void;
}

const convertURLToKey = (url: string) => {
  const domainAddress = getS3DomainAddress();
  const splitedURL = url.split(domainAddress);
  return splitedURL[1];
};

const s3ImageURLStore = create<S3ImageKeyState>((set) => ({
  imageKeySet: new Set<string>(),

  addImageKey: (url: string) => {
    set((state) => {
      const imageSet = new Set(state.imageKeySet);
      imageSet.add(convertURLToKey(url));
      return { imageKeySet: imageSet };
    });
  },

  deleteImageKey: (url: string) => {
    set((state) => {
      const imageSet = new Set(state.imageKeySet);
      imageSet.delete(convertURLToKey(url));
      return { imageKeySet: imageSet };
    });
  },

  empty: () => {
    set({
      imageKeySet: new Set<string>(),
    });
  },
}));

export default s3ImageURLStore;
