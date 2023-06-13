import { user } from '@prisma/client';
import { HttpFailed } from 'server/types/http';
import UserDto, { Name, Introduce } from './user.dto';

interface UserUtils {
  notFoundException: HttpFailed;
  emptyNameException: HttpFailed;
  limitReachedNameException: HttpFailed;
  notMatchedPatternNameException: HttpFailed;
  duplicateNameException: HttpFailed;
  limitReachedIntroduceException: HttpFailed;
  entityToDto(entity: user): UserDto;
  checkIsLimitReachedName(name: Name): boolean;
  checkIsMatchedPatternName(name: Name): boolean;
  checkIsLimitReachedIntroduce(introduce: Introduce): boolean;
}

const userUtils: UserUtils = {
  notFoundException: {
    error: true,
    code: 404,
    message: '사용자를 찾을 수 없습니다.',
  },

  emptyNameException: {
    error: true,
    code: 400,
    message: '이름을 입력해주세요.',
  },

  limitReachedNameException: {
    error: true,
    code: 400,
    message: '2자 이상 10자 이하의 이름만 사용할 수 있습니다.',
  },

  notMatchedPatternNameException: {
    error: true,
    code: 400,
    message: '이름에는 문자와 숫자만 사용할 수 있습니다.',
  },

  duplicateNameException: {
    error: true,
    code: 400,
    message: '해당 이름은 이미 다른 사용자가 사용하고 있습니다.',
  },

  limitReachedIntroduceException: {
    error: true,
    code: 400,
    message: '100자 이하의 소개만 사용할 수 있습니다.',
  },

  entityToDto(entity) {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.nick,
      introduce: entity.introduce,
      age: entity.age,
      gender: entity.gender,
      sub: entity.sub,
    };
  },

  checkIsLimitReachedName(name) {
    return name.length < 2 || name.length > 10;
  },

  checkIsMatchedPatternName(name) {
    const lowerCaseName = name.toLocaleLowerCase();
    return !!lowerCaseName && /^[가-힣|a-z|0-9|]+$/.test(lowerCaseName);
  },

  checkIsLimitReachedIntroduce(introduce) {
    return introduce.length > 100;
  },
};

export default userUtils;
