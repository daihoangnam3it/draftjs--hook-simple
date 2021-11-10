import React from 'react';
import StyleButton from './StyleButton';

const InlineStyle = ({ handleStyle, editorState }) => {
  const CONSTANT__INLINE = [
    { label: 'B', value: 'BOLD' },
    { label: 'I', value: 'ITALIC' },
    { label: 'U', value: 'UNDERLINE' },
    { label: 'CODE', value: 'CODE' },
  ];
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className='inline__control'>
      {CONSTANT__INLINE.map((el) => {
        return (
          <StyleButton
            key={el.label}
            value={el}
            handleStyle={handleStyle}
            active={currentStyle.has(el.value)}
          />
        );
      })}
    </div>
  );
};

export default InlineStyle;
