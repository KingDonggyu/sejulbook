import { GetServerSidePropsContext } from 'next';
import BookReviewService from 'server/features/bookReview/bookReview.service';
import CategoryService from 'server/features/category/category.service';
import CommentService from 'server/features/comment/comment.service';
import LikeService from 'server/features/like/like.service';
import UserService from 'server/features/user/user.service';

const HomePage = () => <div>test</div>;

export const getServerSideProps = async () => {
  console.log(await new CategoryService().findNameById(2));

  return { props: {} };
};

export default HomePage;
