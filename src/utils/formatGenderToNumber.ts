import { Gender } from '@/types/domain/user';

const formatGenderToNumber = (gender?: string): Gender => {
  if (!gender) {
    return 0;
  }
  if (gender.charAt(0).toLowerCase() === 'm') {
    return 1;
  }
  return 2;
};

export default formatGenderToNumber;
