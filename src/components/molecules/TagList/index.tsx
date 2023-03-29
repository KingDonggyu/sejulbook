import styled from '@emotion/styled';
import Button from '@/components/atoms/Button';
import { ButtonVariant, ColorVariant } from '@/constants';

interface TagListProps {
  tags: string[];
  onClickTag?: (tag: string) => void;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
`;

const TagList = ({ tags, onClickTag }: TagListProps) => (
  <Wrapper>
    {tags.map((name) => (
      <Button
        key={name}
        elevation={0}
        variant={ButtonVariant.CONTAINED}
        color={ColorVariant.LINE}
        onClick={() => onClickTag && onClickTag(name)}
      >
        #{name}
      </Button>
    ))}
  </Wrapper>
);

export default TagList;
