import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import TextField from '@/components/atoms/TextField';
import Button from '@/components/atoms/Button';
import { TextFieldVariant } from '@/constants';
import * as s from './style';

type Tag = string;
type TagList = Set<Tag>;

interface TagItemProps {
  tag: string;
  handleDelete: (tag: Tag) => void;
}

interface TagInputProps {
  initTagList?: TagList;
  handleUpdate: (tagList: TagList) => void;
}

const TagItem = ({ tag, handleDelete }: TagItemProps) => (
  <s.HashTag>
    #{tag}
    <Button.Cancel size={14} onClick={() => handleDelete(tag)} />
  </s.HashTag>
);

const TagInput = ({ initTagList, handleUpdate }: TagInputProps) => {
  const [currentTag, setCurrentTag] = useState<Tag>('');
  const [tagList, setTagList] = useState<TagList>(new Set<Tag>());

  useEffect(() => {
    if (initTagList) {
      setTagList(initTagList);
    }
  }, [initTagList]);

  const handleComplete = () => {
    if (currentTag && !tagList.has(currentTag)) {
      const newTagList = new Set(tagList);
      newTagList.add(currentTag);
      setTagList(newTagList);
      handleUpdate(newTagList);
    }
    setCurrentTag('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z|0-9|]+$/;
    if (!e.target.value || regex.test(e.target.value)) {
      setCurrentTag(e.target.value);
      return;
    }
    handleComplete();
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleComplete();
    }
  };

  const handleDelete = (targetTag: Tag) => {
    const newTagList = new Set(tagList);
    newTagList.delete(targetTag);
    setTagList(newTagList);
    handleUpdate(newTagList);
  };

  return (
    <s.Wrapper>
      {Array.from(tagList).map((tag) => (
        <TagItem key={tag} tag={tag} handleDelete={handleDelete} />
      ))}
      <TextField
        value={currentTag}
        onChange={handleChange}
        onBlur={handleComplete}
        onKeyUp={handleKeyUp}
        placeholder="태그입력"
        icon={<s.Hash>#</s.Hash>}
        variant={TextFieldVariant.TEXT}
        css={s.textFieldStyle}
        style={{
          width: `${Math.max(currentTag.length * 12, 48)}px`,
        }}
      />
    </s.Wrapper>
  );
};

export default TagInput;
