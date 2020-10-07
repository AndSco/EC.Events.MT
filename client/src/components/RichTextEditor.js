import React from "react";
import JoditEditor from "jodit-react";

const RichTextEditor = ({ onRichTextUpdate, startingValue }) => {
  const editor = React.useRef(null);
  const [content, setContent] = React.useState(startingValue);

  React.useEffect(() => onRichTextUpdate(content), [content, onRichTextUpdate]);

  const config = {
    readonly: false,
    height: 300
  };

  return (
    <div style={{ ...styles.inputContainer }} className="input-container">
      <label>
        Description <span style={{ color: "red" }}> *</span>
      </label>

      <div style={{ padding: "1.6rem 0" }}>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)}
        />
      </div>
    </div>
  );
};

const styles = {
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    padding: "6px 10px",
    margin: 10
  }
};

export default RichTextEditor;
