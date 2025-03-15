import React, { useState, useEffect, useRef } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "tailwindcss/tailwind.css";

const CertificateEditor = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [showBubble, setShowBubble] = useState(false);
  const [bubblePosition, setBubblePosition] = useState({ top: 0, left: 0 });
  const editorRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const quillEditor = editorRef.current.getEditor();
    quillEditor.on("selection-change", (range) => {
      if (range && range.length > 0) {
        const bounds = quillEditor.getBounds(range.index, range.length);
        adjustBubblePosition(bounds, quillEditor);
        setShowBubble(true);
      } else {
        setShowBubble(false);
      }
    });
  }, []);

  const adjustBubblePosition = (bounds, editor) => {
    const editorRect = editor.container.getBoundingClientRect();
    const bubbleRect = bubbleRef.current?.getBoundingClientRect();
    let top = bounds.top + editorRect.top - (bubbleRect?.height || 40);
    let left = bounds.left + editorRect.left;

    if (left + (bubbleRect?.width || 200) > window.innerWidth) {
      left = window.innerWidth - (bubbleRect?.width || 200) - 10;
    }
    if (left < 10) left = 10;
    if (top < 10) top = bounds.top + editorRect.bottom;

    setBubblePosition({ top, left });
  };

  const applyStyle = (style, value) => {
    editorRef.current.getEditor().format(style, value);
  };

  return (
    <div className="relative p-4">
      <ReactQuill
        ref={editorRef}
        value={editorHtml}
        onChange={setEditorHtml}
        modules={{ toolbar: false }}
        className="w-full h-64 border border-gray-300 rounded-lg"
      />

      {showBubble && (
        <div
          ref={bubbleRef}
          className="absolute z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg flex gap-2 flex-wrap"
          style={{ top: bubblePosition.top, left: bubblePosition.left }}
        >
          <button
            className="px-2 py-1 hover:bg-gray-700 rounded font-bold"
            onClick={() => applyStyle("bold", true)}
          >
            B
          </button>
          <button
            className="px-2 py-1 hover:bg-gray-700 rounded italic"
            onClick={() => applyStyle("italic", true)}
          >
            I
          </button>
          <button
            className="px-2 py-1 hover:bg-gray-700 rounded underline"
            onClick={() => applyStyle("underline", true)}
          >
            U
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificateEditor;
