import Image from 'next/image';
import Button from '@/components/atoms/Button';
import searchLightSrc from '@/public/images/search-light.svg';

const SearchButton = () => (
  <Button style={{ width: '50px' }}>
    <Image src={searchLightSrc} alt="검색 버튼" style={{ width: '100%' }} />
  </Button>
);

export default SearchButton;
