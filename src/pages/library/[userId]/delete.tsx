import { useState } from 'react';
import { signOut } from 'next-auth/react';
import DeleteTemplate from '@/components/templates/Delete';

const deletePage = () => {
  const [isAgree, setIsAgree] = useState(false);

  const handleClickAgreeCheckBox = () => {
    setIsAgree(!isAgree);
  };

  const handleClickDeleteButton = () => {
    if (!isAgree) {
      alert('동의 후 다시 시도해 주세요.');
      return;
    }

    signOut();
  };

  return (
    <DeleteTemplate
      isAgree={isAgree}
      onClickAgreeCheckBox={handleClickAgreeCheckBox}
      onClickDeleteButton={handleClickDeleteButton}
    />
  );
};

export default deletePage;
