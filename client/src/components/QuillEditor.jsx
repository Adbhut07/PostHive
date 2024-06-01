import React, { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const QuillEditor = ({ value, onChange, ...props }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      console.log('Quill Editor initialized:', quillRef.current);
    }
  }, []);

  return (
    <ReactQuill
      ref={quillRef}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default QuillEditor;
