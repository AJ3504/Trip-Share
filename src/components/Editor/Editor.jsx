import React, { useState, useMemo, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';

// 이미지 리사이즈를 위해 모듈을 Quill에 등록
Quill.register('modules/imageResize', ImageResize);

const Editor = ({ value, onChange }) => {
  const quillRef = useRef();
  const [content, setContent] = useState(value);

  const resizeAllImages = (content) => {
    const imageTagRegex = /<img[^>]+>/g;
    const resizedContent = content.replace(imageTagRegex, (imageTag) => {
      if (imageTag.includes('style="')) {
        return imageTag;
      } else {
        return imageTag.replace('<img', '<img style="max-width: 20%;"');
      }
    });
    return resizedContent;
  };

  const checkImageSizes = async (content) => {
    const imageTagRegex = /<img[^>]+>/g;
    const images = content.match(imageTagRegex);

    if (images) {
      const rejectedImages = [];
      const promises = images.map(async (imageTag) => {
        const imgSrc = imageTag.match(/src="([^"]+)"/)[1];
        const imageBlob = await dataURItoBlob(imgSrc);
        if (imageBlob.size > 1 * 800 * 1024) {
          rejectedImages.push(imgSrc);
        }
      });

      await Promise.all(promises);

      if (rejectedImages.length > 0) {
        alert('이미지 크기는 800KB 이하로 업로드해주세요.');
        return null;
      }
    }
    return content;
  };

  const handleContentChange = async (value) => {
    const resizedContent = resizeAllImages(value);
    const processedContent = await checkImageSizes(resizedContent);
    if (processedContent !== null) {
      setContent(processedContent);
    }
  };

  // 에디터 내용이 바뀔 때마다 부모 컴포넌트로 업데이트 전달
  useEffect(() => {
    onChange(content);
  }, [content, onChange]);

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
        ]
      },
      imageResize: {
        parchment: Quill.import('parchment')
      }
    };
  }, []);

  // Data URI를 Blob 객체로 변환하는 함수
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div>
      <ReactQuill
        style={{ width: '450px', height: '200px' }}
        placeholder="내용을 입력해주세요"
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={handleContentChange}
        modules={modules}
      />
    </div>
  );
};

export default Editor;
