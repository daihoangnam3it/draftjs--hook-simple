import React, { useEffect, useState, useRef } from 'react';
import { convertToHTML } from 'draft-convert';
import { stateToHTML } from 'draft-js-export-html';
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  // convertFromRaw,
  // convertToRaw,
} from 'draft-js';
import './style.css';
import BlockStyle from './components/BlockStyle';
import InlineStyle from './components/InlineStyle';

import styleMap from './utils/StyleMap';
const App = () => {
  const { hasCommandModifier } = KeyBindingUtil;
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(),
  );
  const [review, setReview] = useState(() => EditorState.createEmpty());
  const [text, setText] = useState({
    __html: ' ',
  });
  const ref = useRef();
  const handleSave = (e) => {
    e.preventDefault();
    // let html = stateToHTML(editorState.getCurrentContent());
    // const b = convertToRaw(editorState.getCurrentContent());
    // const a = convertFromRaw(b);
    setReview(editorState);
    const content = convertToHTML(editorState.getCurrentContent());
    const newContent = {
      __html: content,
    };

    setText(newContent);
    setEditorState(() => EditorState.createEmpty());
  };
  const handleOnChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    switch (command) {
      case 'CODE':
        const content = RichUtils.toggleInlineStyle(editorState, command);
        handleOnChange(content);
        return 'handled';
      default:
        return 'not-handled';
    }
  };
  const myKeyBindingFn = (e) => {
    if (e.keyCode === 88) {
      return 'CODE';
    }
    return getDefaultKeyBinding(e);
  };
  const handleFocus = () => {
    ref.current.focus();
  };

  const handleBlockStyle = (e, style) => {
    e.preventDefault();
    const content = RichUtils.toggleBlockType(editorState, style);
    handleOnChange(content);
  };
  const handleInlineStyle = (e, style) => {
    console.log(style);
    e.preventDefault();
    const content = RichUtils.toggleInlineStyle(editorState, style);
    handleOnChange(content);
  };

  return (
    <div className='container'>
      <div className='container__show'>
        <Editor editorState={review} readOnly />
      </div>
      <div onClick={() => handleFocus()} className='container__editor'>
        {/* <div>
          Output: <span dangerouslySetInnerHTML={text} />
        </div> */}
        <BlockStyle handleStyle={handleBlockStyle} editorState={editorState} />
        <InlineStyle
          handleStyle={handleInlineStyle}
          editorState={editorState}
        />
        <h2>Input here</h2>
        <div className='editor'>
          <Editor
            editorState={editorState}
            onChange={handleOnChange}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={myKeyBindingFn}
            ref={ref}
            customStyleMap={styleMap}
          />
        </div>
        <button className='btn btn--save' onMouseDown={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default App;
