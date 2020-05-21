import React from "react";
import JoditEditor from "jodit-react";


const RichTextEditor = ({ onRichTextUpdate, startingValue }) => {
  const editor = React.useRef(null);
  const [content, setContent] = React.useState(startingValue);

  React.useEffect(() => onRichTextUpdate(content), [content, onRichTextUpdate]);

  const config = {
    readonly: false // all options from https://xdsoft.net/jodit/doc/
  };

  return (
    <div
      style={{ ...styles.inputContainer}}
      className="input-container"
    >
      <label>
        Description <span style={{ color: "red" }}> *</span>
      </label>

      <div style={{padding: "10px 0"}}>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          // onChange={newContent => {}}
        />
      </div>  
    </div>
  );
};

const styles = {
  inputContainer: {
    // height: 40,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    padding: "6px 10px",
    margin: 10
  }
};

export default RichTextEditor;