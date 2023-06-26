import SEO from '@/components/atoms/SEO';
import ErrorTemplate from '@/components/templates/Error';

const ErrorPage = () => (
  <>
    <SEO />
    <ErrorTemplate
      title={
        <>
          예상하지 못한 오류가 발생했습니다.
          <span>잠시 후 다시 시도해 주세요.</span>
        </>
      }
      errorMessage="500 - Server Error"
    />
  </>
);

export default ErrorPage;
