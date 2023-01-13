import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import Button from '@/components/atoms/Button';

const SearchButton = () => (
  <Button style={{ width: '50px' }}>
    <AiOutlineSearch size={25} />
  </Button>
);

export default SearchButton;
