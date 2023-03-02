import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';
import styled from '@emotion/styled';

interface TagListProps {
  tags: string[];
  handleTagClick?: () => void;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
`;

const TagList = ({ tags, handleTagClick }: TagListProps) => (
  <Wrapper>
    {tags.map((name) => (
      <Button
        key={name}
        elevation={0}
        variant={ButtonVariant.CONTAINED}
        color={ColorVariant.LINE}
        onClick={handleTagClick}
      >
        #{name}
      </Button>
    ))}
  </Wrapper>
);

export default TagList;
