import React, { useState, useMemo, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
Quill.register('modules/imageResize', ImageResize);

const Editor = ({ value, onChange }) => {
  const quillRef = useRef();
  const [content, setContent] = useState(value);

  // 에디터 툴바의 이미지 선택 핸들러
  const handleImageSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageChange;
    input.click();
  };

  // 이미지 업로드 시, 크기 체크를 위한 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 800 * 1024) {
      alert('이미지 크기가 800KB 이상입니다. 800KB 이하의 이미지를 선택해주세요.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      // 이미지를 에디터에 삽입
      insertImageToEditor(base64Image);
    };
    reader.readAsDataURL(file);
  };

  // 이미지를 에디터에 삽입하는 함수
  const insertImageToEditor = (base64Image) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    quill.insertEmbed(range.index, 'image', base64Image, Quill.sources.USER);
    quill.setSelection(range.index + 1, Quill.sources.SILENT);
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image']
        ],
        handlers: {
          image: handleImageSelect
        }
      },
      imageResize: {
        parchment: Quill.import('parchment')
      }
    };
  }, []);

  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

  return (
    <div>
      <ReactQuill
        style={{ width: '450px', height: '300px' }}
        placeholder="내용을 입력해주세요"
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
};

export default Editor;
