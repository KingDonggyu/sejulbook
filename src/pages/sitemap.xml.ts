import { GetServerSidePropsContext } from 'next';
import Route from '@/constants/routes';
import { getAllUserId } from '@/services/api/user';
import { UserId } from '@/types/features/user';
import { BookReviewId } from '@/types/features/bookReview';
import { getAllBookReviewId } from '@/services/api/bookReview';

const BASE_URL = process.env.SEJULBOOK_BASE_URL;

interface GenerateSiteMapParams {
  allUserId: { id: UserId }[];
  allBookReviewId: { id: BookReviewId }[];
}

const generateSiteMap = ({
  allUserId,
  allBookReviewId,
}: GenerateSiteMapParams) => `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${BASE_URL}</loc>
    </url>
    <url>
      <loc>${BASE_URL}${Route.SEARCH}</loc>
    </url>
    <url>
      <loc>${BASE_URL}${Route.SUBSCRIPTIONS}</loc>
    </url>
    <url>
      <loc>${BASE_URL}${Route.NEWBOOK_SEARCH}</loc>
    </url>
    <url>
      <loc>${BASE_URL}${Route.NEWBOOK_WRITE}</loc>
    </url>
    ${allUserId
      .map(
        ({ id }) => `
      <url>
        <loc>${BASE_URL}${Route.LIBRARY}/${id}</loc>
      </url>
    `,
      )
      .join('')}
    ${allBookReviewId
      .map(
        ({ id }) => `
      <url>
        <loc>${BASE_URL}${Route.BOOKREVIEW}/${id}</loc>
      </url>
    `,
      )
      .join('')}
  </urlset>
`;

const SiteMap = () => {};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const result = await Promise.allSettled([
    getAllUserId(),
    getAllBookReviewId(),
  ]);

  const allUserId = result[0].status === 'fulfilled' ? result[0].value : [];
  const allBookReviewId =
    result[1].status === 'fulfilled' ? result[1].value : [];

  const sitemap = generateSiteMap({ allUserId, allBookReviewId });

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
