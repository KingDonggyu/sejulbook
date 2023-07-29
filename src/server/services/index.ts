// eslint-disable-next-line max-classes-per-file
import BookReviewServiceOrigin from './bookReview.service';
import UserServiceOrigin from './user.service';

import LikeService from './like.service';
import FollowService from './follow.service';
import CategoryService from './category.service';
import TagService from './tag.service';
import CommentService from './comment.service';

export class BookReviewService extends BookReviewServiceOrigin {
  constructor() {
    const followService = new FollowService();
    const commentService = new CommentService();
    const likeService = new LikeService();

    super({
      userService: new UserServiceOrigin({
        followService,
        commentService,
        likeService,
      }),
      followService,
      commentService,
      likeService,
      categoryService: new CategoryService(),
      tagService: new TagService(),
    });
  }
}

export class UserService extends UserServiceOrigin {
  constructor() {
    super({
      followService: new FollowService(),
      commentService: new CommentService(),
      likeService: new LikeService(),
    });
  }
}

export {
  CategoryService,
  CommentService,
  FollowService,
  LikeService,
  TagService,
};
