import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeDisplay = ({ code }) => {
    return (
        <SyntaxHighlighter language="javascript" style={oneLight} >
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeDisplay;
