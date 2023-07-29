// eslint-disable-next-line max-classes-per-file
import UserServiceOrigin from './user.service';
import LikeServiceOrigin from './like.service';
import FollowServiceOrigin from './follow.service';
import CategoryServiceOrigin from './category.service';
import TagServiceOrigin from './tag.service';
import CommentServiceOrigin from './comment.service';
import BookReviewServiceOrigin from './bookReview.service';

export class BookReviewService extends BookReviewServiceOrigin {
  constructor() {
    const followService = new FollowServiceOrigin();
    const commentService = new CommentServiceOrigin();
    const likeService = new LikeServiceOrigin();

    super({
      userService: new UserServiceOrigin({
        followService,
        commentService,
        likeService,
      }),
      followService,
      commentService,
      likeService,
      categoryService: new CategoryServiceOrigin(),
      tagService: new TagServiceOrigin(),
    });
  }
}

export class UserService extends UserServiceOrigin {
  constructor() {
    super({
      followService: new FollowServiceOrigin(),
      commentService: new CommentServiceOrigin(),
      likeService: new LikeServiceOrigin(),
    });
  }
}
