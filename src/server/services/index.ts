import UserServiceOrigin from './user.service';
import LikeServiceOrigin from './like.service';
import FollowServiceOrigin from './follow.service';
import CategoryServiceOrigin from './category.service';
import TagServiceOrigin from './tag.service';
import CommentServiceOrigin from './comment.service';
import BookReviewServiceOrigin from './bookReview.service';

export class BookReviewService extends BookReviewServiceOrigin {
  constructor() {
    super({
      userService: new UserServiceOrigin(),
      likeService: new LikeServiceOrigin(),
      followService: new FollowServiceOrigin(),
      categoryService: new CategoryServiceOrigin(),
      tagService: new TagServiceOrigin(),
      commentService: new CommentServiceOrigin(),
    });
  }
}

// export const bookReviewService = new BookReviewService({
//   userService: new UserService(),
//   likeService: new LikeService(),
//   followService: new FollowService(),
//   categoryService: new CategoryService(),
//   tagService: new TagService(),
//   commentService: new CommentService(),
// });
