import { Editor } from '@tinymce/tinymce-react';
import bookReviewStore from '@/stores/bookReviewStore';
import { useScreenModeContext } from '@/contexts/screenModeContext';
import { editorContentStyle } from '@/styles/editor';
import * as s from './style';

const ContentEditor = () => {
  const editorId = 'sejulbookEditor';
  const { setContent } = bookReviewStore();
  const { isDarkMode } = useScreenModeContext();

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  return (
    <s.EditorContainer editorId={editorId}>
      <Editor
        inline
        tagName="div"
        id={editorId}
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        init={{
          menubar: false,
          language: 'ko_KR',
          skin: isDarkMode ? 'oxide-dark' : 'snow',
          icons: 'thin',
          plugins: 'autoresize lists code table codesample',
          toolbar:
            'blocks | forecolor backcolor | bold italic underline strikethrough | link blockquote codesample | align bullist numlist ',
          toolbar_location: 'bottom',
          placeholder: '[선택] 추가 내용 작성',
          block_formats: `본문=p;제목 1=h2;제목 2=h3;`,
        }}
        onEditorChange={handleEditorChange}
        css={editorContentStyle}
      />
    </s.EditorContainer>
  );
};

export default ContentEditor;
