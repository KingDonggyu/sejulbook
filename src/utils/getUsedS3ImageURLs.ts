import getS3DomainAddress from './getS3DomainAddress';

const getUsedS3ImageURLs = (imagesContainerElementId: string) => {
  const imagesContainerElement = document.getElementById(
    imagesContainerElementId,
  );

  const usedS3Images = imagesContainerElement?.getElementsByTagName('img');

  if (!usedS3Images || !usedS3Images.length) {
    return [];
  }

  const usedS3ImageURLs: string[] = [];
  const domainAddress = getS3DomainAddress();

  Array.from(usedS3Images).reduce((urls, { src }) => {
    if (src.startsWith(domainAddress)) {
      urls.push(src);
    }
    return urls;
  }, usedS3ImageURLs);

  return usedS3ImageURLs;
};

export default getUsedS3ImageURLs;
