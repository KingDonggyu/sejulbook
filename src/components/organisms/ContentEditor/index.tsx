import { Editor } from '@tinymce/tinymce-react';
import { sanitize } from 'isomorphic-dompurify';
import { toast } from 'react-toastify';
import { post } from '@/lib/HTTPClient';
import bookReviewStore from '@/stores/bookReviewStore';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import { editorContentStyle } from '@/styles/editor';
import { uploadImage } from '@/services/api/bookReview';
import { BookReviewError } from '@/services/errors/BookReviewError';
import * as s from './style';

interface ContentEditorProps {
  initialValue?: string;
  readonly?: boolean;
}

const editorOption = {
  id: 'sejulbookEditor',
  lightSkin: 'snow',
  darkSkin: 'oxide-dark',
  language: 'ko_KR',
  plugins: 'autoresize lists code table codesample',
  toolbar:
    'blocks | forecolor backcolor | bold italic underline strikethrough | link blockquote codesample | align bullist numlist ',
  placeholder: '[선택] 추가 내용 작성',
  blockFormats: `본문=p;제목 1=h1;제목 2=h2;제목 3=h3;`,
};

const ContentEditor = ({
  initialValue,
  readonly = false,
}: ContentEditorProps) => {
  const { setContent } = bookReviewStore();
  const { isDarkMode } = useScreenModeContext();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleUploadLocalImage = async (blob: Blob) => {
    try {
      const response = await uploadImage({
        fileName: blob.name,
        fileType: blob.type,
      });
      const { url, fields } = response;
      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('file', new File([blob], blob.name));

      await post(url, formData);

      return `${url}${fields.key}`;
    } catch (error) {
      if (error instanceof BookReviewError) {
        toast.error(error.message);
      }
      return '';
    }
  };

  return (
    <s.EditorContainer editorId={editorOption.id} readonly={readonly}>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        id={editorOption.id}
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
          images_upload_handler: async (blobInfo) => {
            const url = await handleUploadLocalImage(blobInfo.blob());
            return url;
          },
        }}
      />
    </s.EditorContainer>
  );
};

export default ContentEditor;
