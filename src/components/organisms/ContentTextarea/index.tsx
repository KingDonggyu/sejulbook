import { Editor } from '@tinymce/tinymce-react';
import { useScreenModeContext } from '@/contexts/screenModeContext';

import { useState } from 'react';
import * as s from './style';

const ContentTextarea = () => {
  const { isDarkMode, theme } = useScreenModeContext();
  const [isVisibleToolBar, setIsVisibleToolbar] = useState(false);

  const handleEditorChange = (content: string) => {
    // console.log(content);
  };

  return (
    <s.EditorContainer isVisibleToolBar={isVisibleToolBar}>
      <Editor
        id="sejulbookEditor"
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
          content_style: s.editorContentStyle(theme).styles,
          block_formats: `본문=p;제목 1=h1;제목 2=h2;제목 3=h3`,
        }}
        onEditorChange={handleEditorChange}
        onClick={() => setIsVisibleToolbar(true)}
        onBlur={() => setIsVisibleToolbar(false)}
      />
    </s.EditorContainer>
  );
};

export default ContentTextarea;
