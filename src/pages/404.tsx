import ErrorTemplate from '@/components/templates/Error';
import SEO from '@/components/atoms/SEO';

const NotFoundPage = () => (
  <>
    <SEO />
    <ErrorTemplate
      title={
        <>
          해당 페이지를 <span>찾을 수 없습니다.</span>
        </>
      }
      errorMessage="404 - Page is not Found"
    />
  </>
);

export default NotFoundPage;
