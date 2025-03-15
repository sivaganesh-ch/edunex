import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BubbleEditor = () => {
  const [editor, setEditor] = useState(null);
  const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0, visible: false });

  const quillRef = useRef(null);
  const bubbleRef = useRef(null);

  // Formats List for Quill Editor
  const formats = ["bold", "italic", "underline", "strike", "color", "align"];

  // Bubble Menu Handler
  const showBubbleMenu = () => {
    if (!editor) return;
    const selection = editor.getSelection();
    if (selection && selection.length > 0) {
      const rangeBounds = editor.getBounds(selection.index, selection.length);
      setBubblePosition({
        top: rangeBounds.top - 45,
        left: rangeBounds.left,
        visible: true,
      });
    } else {
      setBubblePosition((prev) => ({ ...prev, visible: false }));
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      setEditor(quillRef.current.getEditor());
    }
  }, []);

  useEffect(() => {
    if (editor) {
      editor.on("selection-change", showBubbleMenu);
    }
    return () => {
      if (editor) {
        editor.off("selection-change", showBubbleMenu);
      }
    };
  }, [editor]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Bubble Menu */}
      {bubblePosition.visible && (
        <div
          ref={bubbleRef}
          className="absolute z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg flex gap-2 transition-opacity duration-300"
          style={{ top: bubblePosition.top, left: bubblePosition.left }}
        >
          <button className="px-2 py-1 hover:bg-gray-700 rounded" onClick={() => editor.format("bold", true)}>B</button>
          <button className="px-2 py-1 hover:bg-gray-700 rounded italic" onClick={() => editor.format("italic", true)}>I</button>
          <button className="px-2 py-1 hover:bg-gray-700 rounded underline" onClick={() => editor.format("underline", true)}>U</button>
          <button className="px-2 py-1 hover:bg-gray-700 rounded line-through" onClick={() => editor.format("strike", true)}>S</button>
        </div>
      )}

      {/* Editor */}
      <ReactQuill
        ref={quillRef}
        theme="snow"
        formats={formats}
        className="h-64"
        placeholder="Write something..."
      />
    </div>
  );
};

export default BubbleEditor;
