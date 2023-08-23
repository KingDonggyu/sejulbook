import { Editor } from '@tinymce/tinymce-react';
import { sanitize } from 'isomorphic-dompurify';
import bookReviewStore from '@/stores/newBookReviewStore';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import useLocalImageUploader from '@/hooks/useLocalImageUploader';
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
  plugins: 'autoresize lists code table codesample image',
  toolbar:
    'blocks | forecolor backcolor | bold italic underline strikethrough | link blockquote codesample | align bullist numlist | image',
  placeholder: '[선택] 추가 내용 작성',
  blockFormats: `본문=p;제목 1=h1;제목 2=h2;제목 3=h3;`,
  imageFileTypes: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp,svg',
};

const ContentEditor = ({
  initialValue,
  readonly = false,
}: ContentEditorProps) => {
  const { bookReview, setContent } = bookReviewStore();
  const { isDarkMode } = useScreenModeContext();
  const uploadLocalImage = useLocalImageUploader();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  return (
    <s.EditorContainer editorId={editorElementId} readonly={readonly}>
      {readonly ? (
        <div
          id={editorElementId}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={
            initialValue ? { __html: sanitize(initialValue) } : undefined
          }
        />
      ) : (
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
          id={editorElementId}
          inline
          tagName="div"
          disabled={readonly}
          value={bookReview.content}
          initialValue={initialValue && sanitize(initialValue)}
          onEditorChange={handleEditorChange}
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
            file_picker_types: 'image',
            images_upload_handler: async (blobInfo) => {
              const url = await uploadLocalImage(blobInfo.blob());
              return url;
            },
          }}
        />
      )}
    </s.EditorContainer>
  );
};

export default ContentEditor;
