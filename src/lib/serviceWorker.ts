import ImageRepository from '@/repository/api/ImageRepository';

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (event: MessageEvent<string[]>) => {
  new ImageRepository().delete(event.data);
});
