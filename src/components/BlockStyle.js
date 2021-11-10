import React from 'react';
import StyleButton from './StyleButton';

const BlockStyle = ({ handleStyle, editorState }) => {
  const CONSTANT__BLOCK = [
    { label: 'H1', value: 'header-one' },
    { label: 'H2', value: 'header-two' },
    { label: 'H3', value: 'header-three' },
    { label: 'H4', value: 'header-four' },
    { label: 'H5', value: 'header-five' },
    { label: 'H6', value: 'header-six' },
    { label: 'UL', value: 'unordered-list-item' },
    { label: 'OL', value: 'ordered-list-item' },
  ];
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className='block__control'>
      {CONSTANT__BLOCK.map((el) => {
        return (
          <StyleButton
            key={el.label}
            value={el}
            handleStyle={handleStyle}
            active={el.value === blockType}
          />
        );
      })}
    </div>
  );
};

export default BlockStyle;
