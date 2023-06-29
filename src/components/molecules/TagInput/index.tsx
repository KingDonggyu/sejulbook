import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import TextField from '@/components/atoms/TextField';
import Button from '@/components/atoms/Button';
import { TextFieldVariant } from '@/constants';
import * as s from './style';

interface TagItemProps {
  tag: string;
  handleDelete: (tag: string) => void;
}

const TagItem = ({ tag, handleDelete }: TagItemProps) => (
  <s.HashTag>
    #{tag}
    <Button.Cancel size={14} onClick={() => handleDelete(tag)} />
  </s.HashTag>
);

interface TagInputProps {
  initTagList?: string[];
  handleUpdate: (tagList: string[]) => void;
}

const TagInput = ({ initTagList, handleUpdate }: TagInputProps) => {
  const [currentTag, setCurrentTag] = useState<string>('');
  const [tagList, setTagList] = useState<Set<string>>(new Set<string>());

  useEffect(() => {
    if (initTagList) {
      setTagList(new Set(initTagList));
    }
  }, [initTagList]);

  const handleComplete = () => {
    if (currentTag && !tagList.has(currentTag)) {
      const newTagList = new Set(tagList);
      newTagList.add(currentTag);
      setTagList(newTagList);
      handleUpdate(Array.from(newTagList));
    }
    setCurrentTag('');
  };

  const handleDelete = (targetTag: string) => {
    const newTagList = new Set(tagList);
    newTagList.delete(targetTag);
    setTagList(newTagList);
    handleUpdate(Array.from(newTagList));
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
