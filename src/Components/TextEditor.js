import React, { useState } from "react";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.snow.css";
import "./TextEditor.css";

const TextEditor = (props) => {
  return (
    <div>
      <ReactQuill
        placeholder="write something "
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        onChange={(e)=>{props.onChange(e)}}
        value={props.value}
      />
    </div>
  );
};

TextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

TextEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default TextEditor;
