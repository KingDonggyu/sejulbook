import { userError } from 'server/constants/message';
import { HttpFailed } from 'server/types/http';
import UserDTO from './user.dto';

class UserGuard {
  private user: Partial<UserDTO>;

  constructor(user: Partial<UserDTO>) {
    this.user = user;
  }

  checkUserNotFound(): HttpFailed | false {
    if (this.user.id) {
      return false;
    }
    return {
      error: true,
      code: 404,
      message: userError.USER_NOT_FOUND,
    };
  }

  checkEmptyName(): HttpFailed | false {
    if (this.user.name) {
      return false;
    }
    return {
      error: true,
      code: 400,
      message: userError.EMPTY_NAME,
    };
  }

  checkReachedNameLimit(): HttpFailed | false {
    const isEmptyName = this.checkEmptyName();

    if (isEmptyName) {
      return isEmptyName;
    }

    if (
      this.user.name &&
      this.user.name.length > 1 &&
      this.user.name.length < 11
    ) {
      return false;
    }

    return {
      error: true,
      code: 400,
      message: userError.LIMIT_REACHED_NAME,
    };
  }

  checkNotMatchedPatternName(): HttpFailed | false {
    const isEmptyName = this.checkEmptyName();

    if (isEmptyName) {
      return isEmptyName;
    }

    const name = this.user.name?.toLocaleLowerCase();

    if (name && /^[가-힣|a-z|0-9|]+$/.test(name)) {
      return false;
    }
    return {
      error: true,
      code: 400,
      message: userError.NOT_MATCHED_PATTERN_NAME,
    };
  }

  checkReachedIntroduceLimit(): HttpFailed | false {
    if (!this.user.introduce || this.user.introduce.length < 101) {
      return false;
    }

    return {
      error: true,
      code: 400,
      message: userError.LIMIT_REACHED_INTRODUCE,
    };
  }

  checkInvalidProfile(): HttpFailed | false {
    const result =
      this.checkReachedNameLimit() ||
      this.checkNotMatchedPatternName() ||
      this.checkReachedIntroduceLimit();

    if (result) {
      return result;
    }

    return false;
  }
}

export default UserGuard;
