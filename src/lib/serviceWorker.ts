import { deleteS3Objects } from './s3Client';

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', (event: MessageEvent<string[]>) => {
  deleteS3Objects(event.data);
});
