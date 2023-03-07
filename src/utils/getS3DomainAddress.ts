const getS3DomainAddress = () => {
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
  const region = process.env.NEXT_PUBLIC_AWS_REGION;
  return `https://${bucketName}.s3.${region}.amazonaws.com/`;
};

export default getS3DomainAddress;
