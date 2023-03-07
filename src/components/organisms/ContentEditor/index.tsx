import { Editor } from '@tinymce/tinymce-react';
import { sanitize } from 'isomorphic-dompurify';
import { toast } from 'react-toastify';
import bookReviewStore from '@/stores/bookReviewStore';
import s3ImageURLStore from '@/stores/s3ImageKeyStore';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import { editorContentStyle } from '@/styles/editor';
import { uploadLocalImage } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import * as s from './style';

interface ContentEditorProps {
  initialValue?: string;
  readonly?: boolean;
}

export const editorElementId = 'sejulbookEditor';

const editorOption = {
  lightSkin: 'snow',
  darkSkin: 'oxide-dark',
  language: 'ko_KR',
  plugins: 'autoresize lists code table codesample',
  toolbar:
    'blocks | forecolor backcolor | bold italic underline strikethrough | link blockquote codesample | align bullist numlist ',
  placeholder: '[선택] 추가 내용 작성',
  blockFormats: `본문=p;제목 1=h1;제목 2=h2;제목 3=h3;`,
  imageFileTypes: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp,svg',
};

const ContentEditor = ({
  initialValue,
  readonly = false,
}: ContentEditorProps) => {
  const { setContent } = bookReviewStore();
  const { addImageKey } = s3ImageURLStore();
  const { isDarkMode } = useScreenModeContext();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleUploadLoacalImage = async (blob: Blob) => {
    try {
      const url = await uploadLocalImage(blob);
      addImageKey(url);
      return url;
    } catch (error) {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
      return '';
    }
  };

  return (
    <s.EditorContainer editorId={editorElementId} readonly={readonly}>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        id={editorElementId}
        inline
        tagName="div"
        disabled={readonly}
        initialValue={initialValue && sanitize(initialValue)}
        onEditorChange={handleEditorChange}
        css={editorContentStyle}
        init={{
          menubar: false,
          skin: isDarkMode ? editorOption.darkSkin : editorOption.lightSkin,
          language: editorOption.language,
          plugins: editorOption.plugins,
          toolbar: editorOption.toolbar,
          toolbar_location: 'bottom',
          placeholder: editorOption.placeholder,
          block_formats: editorOption.blockFormats,
          images_file_types: editorOption.imageFileTypes,
          images_upload_handler: async (blobInfo) =>
            handleUploadLoacalImage(blobInfo.blob()),
        }}
      />
    </s.EditorContainer>
  );
};

export default ContentEditor;
