// import './TipTapEditor.css';
import parser from "html-react-parser";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import FontSize from "./FontSize";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline"; // Not included in StarterKit
// import History from "@tiptap/extension-history";
import React, { useEffect, useContext } from "react";
import { CertificateContext } from "@/context/certificate-setup-contex";
import { parse } from "postcss";

export default ({ boxIndex }) => {
  const {
    textBoxes,
    setTextBoxes,
    template,
    setTemplate,
    templateSize,
    setTemplateSize,
    EditMode,
    setEditMode,
  } = useContext(CertificateContext);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: true, // Ensures bold functionality is included
        italic: true,
        strike: true,
      }),
      Underline, // Needs to be imported separately
      TextStyle,
      FontSize, // Add this here
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false }),
      Image,
      // History,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      FontFamily.configure({ types: ["textStyle"] }),
    ],
    content: textBoxes[boxIndex].text == "Enter"?`
      <p style="text-align: center"><span style="color: blue; font-size: clamp(1rem, 2.5vw, 2rem); font-family: Arial">Text</span></p>
    `: textBoxes[boxIndex].text,
  });

  const [isEditable, setIsEditable] = React.useState(true);
  const [textBoxFontSize, setTextBoxFontSize] = React.useState(16);

  useEffect(() => {
    if (editor) {
      editor.setEditable(EditMode);
    }
  }, [EditMode, editor]);

  // useEffect(() => {
  //   const setInitialTextBoxSize = () => {
  //     editor.chain().focus().setFontSize(`95px`).run();
  //   };
  //   setInitialTextBoxSize();
  // }, []);

  useEffect(() => {
    function convertPxToPercentage(content, parentSize, reference = 'width') {
      return content.replace(/font-size:\s*(\d+)px;/g, (match, pxValue) => {
          const percentage = (parseInt(pxValue) / parentSize) * 100;
          return `font-size: ${percentage}%;`;
      });
    }
    const setTextToTextBox = () => {
      console.log("text-" + boxIndex, parser(editor.getHTML()));
      
      // const updatedHTML = convertPxToPercentage(originalHTML, parentWidth);
      textBoxes[boxIndex].text = editor.getHTML();
    };
    setTextToTextBox();
  }, [editor.getHTML()]);

  return (
    <div className="wrapper" style={{ padding: "1px", position: "relative" }}>
      {/* <div className="control-group">
        <label>
          <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
          Editable
        </label>
      </div> */}

      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu bg-zinc-900">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {/* Font Family */}
              <select
                className=""
                onChange={(e) =>
                  editor.chain().focus().setFontFamily(e.target.value).run()
                }
              >
                <option value="">Font Style</option>
                <option value="Arial">Arial</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Calibri">Calibri</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
              </select>

              {/* Font Size */}
              <input
                type="number"
                min="8"
                placeholder="Size"
                value={textBoxFontSize}
                onChange={(e) => {
                  const value = e.target.value;
                  setTextBoxFontSize(value);
                  // textBoxes[boxIndex].size = value;
                  editor.chain().focus().setFontSize(`${value}px`).run();
                }}
              />
              {/* Formatting */}
              <button onClick={() => editor.chain().focus().toggleBold().run()}>
                B
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                I
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                U
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                S
              </button>

              {/* Alignment */}
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                L
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                C
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                R
              </button>
              <button
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
              >
                J
              </button>

              {/* Colors */}
              <input
                type="color"
                onChange={(e) =>
                  editor.chain().focus().setColor(e.target.value).run()
                }
              />
              <input
                type="color"
                onChange={(e) =>
                  editor
                    .chain()
                    .focus()
                    .setHighlight({ color: e.target.value })
                    .run()
                }
              />

              {/* Link & Image */}
              <button
                onClick={() => {
                  const url = prompt("Enter the URL");
                  if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
              >
                🔗
              </button>

              {/* 🖼 */}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onload = () => setTemplate(reader.result);
                  reader.readAsDataURL(file);
                  editor.chain().focus().setImage({ src: reader.result }).run();
                }}
                className="mb-4 w-5"
              />

              {/* Undo / Redo */}
              <button onClick={() => editor.chain().focus().undo().run()}>
                ↩
              </button>
              <button onClick={() => editor.chain().focus().redo().run()}>
                ↪
              </button>
            </div>
          </div>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="p-1 text-black" />
      {/* <div>{parser(editor.getHTML())}</div> */}
    </div>
  );
};
