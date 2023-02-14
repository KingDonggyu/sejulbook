import { Editor } from '@tinymce/tinymce-react';
import { sanitize } from 'isomorphic-dompurify';
import * as s from './style';

const content = `<h2>목차</h2>
<ul>
<li>목차1<br>
<ul>
<li>목차1-1</li>
</ul>
</li>
<li>목차2
<ul>
<li>목차2-1</li>
<li>목차2-2</li>
</ul>
</li>
<li>목차3</li>
</ul>
<h2>느낀점</h2>
<p>안녕하세요 세 줄 독후감입니다.</p>
<p><span style="color: rgb(224, 62, 45);">안녕하세요 세 줄 독후감입니다.</span></p>
<p>&nbsp;</p>
<p><img src="https://image.kmib.co.kr/online_image/2021/0903/2021090220380531799_1630582685_0924207731.jpg" alt="살며 사랑하며] 책정리 하는 척 - 국민일보" width="490" height="342"></p>`;

const ContentViewer = () => {
  const editorId = 'sejulbookViewer';

  return (
    <s.ViewerContainer editorId={editorId}>
      <Editor
        disabled
        inline
        id={editorId}
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        initialValue={sanitize(content)}
      />
    </s.ViewerContainer>
  );
};

export default ContentViewer;
