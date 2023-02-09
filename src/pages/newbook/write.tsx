import NewbookWrite from '@/components/templates/NewbookWrite';
import DocumentTitle from '@/components/atoms/DocumentTitle';
import Button from '@/components/atoms/Button';
import SejulTextarea from '@/components/organisms/SejulTextarea';
import ContentTextarea from '@/components/organisms/ContentTextarea';
import { ButtonVariant, ColorVariant } from '@/constants';
import { NewbookProvider } from '@/contexts/newbookContext';

const NewbookWritePage = () => (
  <NewbookProvider>
    <DocumentTitle title="독후감 쓰기" />
    <NewbookWrite
      bookName="브레이킹 루틴"
      sejulTextarea={<SejulTextarea />}
      contentTextarea={<ContentTextarea />}
      publishButton={
        <Button variant={ButtonVariant.OUTLINED} color={ColorVariant.PRIMARY}>
          발행
        </Button>
      }
      draftSaveButton={
        <Button variant={ButtonVariant.OUTLINED}>임시 저장</Button>
      }
    />
  </NewbookProvider>
);

export default NewbookWritePage;
