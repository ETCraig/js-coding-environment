import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';

interface CodeEditorProps {
    intitalValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ intitalValue, onChange }) => {

    const editorRef = useRef<any>();

    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue());
        });

        monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
    }

    const onFormatClick = () => {
        const unformatted = editorRef.current.getModal().getValue();

        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true,
        });

        editorRef.current.setValue(formatted);
    }

    return (
    <div>
        <button onClick={onFormatClick}>Format</button>
    <MonacoEditor 
        value={intitalValue}
        editorDidMount={onEditorDidMount}
        language="javascript" 
        theme="dark" 
        height="500px" 
        options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
        }} 
    />
    </div>
)
};

export default CodeEditor;
