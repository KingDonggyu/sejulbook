import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { dehydrate } from '@tanstack/react-query';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import { getUserQuery } from '@/services/queries/user';
import prefetchQuery from '@/services/prefetchQuery';

const HomePage = () => <DocumentTitle />;

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.id === null) {
    return {
      props: { dehydratedState: null },
    };
  }

  const queryClient = await prefetchQuery([getUserQuery(session.id)]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

export default HomePage;
