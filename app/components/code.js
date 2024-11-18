import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeDisplay = ({ code }) => {
    return (
        <SyntaxHighlighter language="javascript" style={oneDark} showLineNumbers>
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeDisplay;
