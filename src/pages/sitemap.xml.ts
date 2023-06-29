import { GetServerSidePropsContext } from 'next';
import type { Id as UserId } from 'user';
import type { Id as BookReviewId } from 'bookReview';
import Route from '@/constants/routes';
import UserRepository from '@/repository/api/UserRepository';
import BookReviewRepository from '@/repository/api/BookReviewRepository';

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
  const [allUserId, allBookReviewId] = await Promise.all([
    new UserRepository().getIds(),
    new BookReviewRepository().getIds(),
  ]);

  const sitemap = generateSiteMap({ allUserId, allBookReviewId });

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
