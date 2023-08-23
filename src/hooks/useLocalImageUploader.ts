import { toast } from 'react-toastify';
import ExceptionBase from '@/lib/HttpErrorException';
import ImageRepository from '@/repository/api/ImageRepository';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';

const useLocalImageUploader = () => {
  const { addImageKey } = s3ImageURLStore();

  const uploadLocalImage = async (blob: Blob) => {
    try {
      const url = await new ImageRepository().upload(blob);
      addImageKey(url);
      return url;
    } catch (error) {
      if (error instanceof ExceptionBase) {
        toast.error(error.message);
      }
      return '';
    }
  };

  return uploadLocalImage;
};

export default useLocalImageUploader;
