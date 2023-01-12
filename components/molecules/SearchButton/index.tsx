import Button from '@/components/atoms/Button';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';

const SearchButton = () => (
  <Button style={{ width: '50px' }}>
    <AiOutlineSearch size={50} />
  </Button>
);

export default SearchButton;
