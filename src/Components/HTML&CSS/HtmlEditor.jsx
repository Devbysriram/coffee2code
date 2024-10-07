import React, { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-emmet';
import 'ace-builds/src-noconflict/ext-language_tools';

import './edi.css';
import Navbar from '../Navbar/Navbar.jsx';

const HtmlEditor = () => {
    const [html, setHtml] = useState('<h1>Lets Learn HTML</h1> ');
    const [css, setCss] = useState('h1 { color: Green; }');
    const [js, setJs] = useState('console.log("Hello World");');
    const [srcDoc, setSrcDoc] = useState('');
    const [activeTab, setActiveTab] = useState('editor');

    const htmlEditorRef = useRef(null);
    const cssEditorRef = useRef(null);
    const jsEditorRef = useRef(null);

    useEffect(() => {
        if (htmlEditorRef.current) {
            htmlEditorRef.current.editor.renderer.updateFull();
        }
        if (cssEditorRef.current) {
            cssEditorRef.current.editor.renderer.updateFull();
        }
        if (jsEditorRef.current) {
            jsEditorRef.current.editor.renderer.updateFull();
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const source = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;
            setSrcDoc(source);
        }, 300);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    const editorProps = {
        theme: "monokai",
        fontSize: 14,
        showPrintMargin: false,
        tabSize: 2,
        width: "100%",
        height: "calc(100vh - 120px)",
        editorProps: { $blockScrolling: true },
        setOptions: {
            useWorker: false,
            fontFamily: 'monospace',
            tabSize: 2,
            wrap: true,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            enableEmmet: true
        },
    };

    return (
        <div className='main'>
            <Navbar />
            <div className="app">
                <div className="tabs">
                    <button 
                        className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
                        onClick={() => setActiveTab('editor')}
                    >
                        Editor
                    </button>
                    <button 
                        className={`tab ${activeTab === 'output' ? 'active' : ''}`}
                        onClick={() => setActiveTab('output')}
                    >
                        Output
                    </button>
                </div>
                {activeTab === 'editor' && (
                    <div className="editor-container">
                        <div className="editor">
                            <h4>HTML</h4>
                            <AceEditor
                                mode="html"
                                value={html}
                                onChange={(value) => setHtml(value)}
                                name="html-editor"
                                ref={htmlEditorRef}
                                useEmmet={true}
                                {...editorProps}
                            />
                        </div> 
                        <div className="editor">
                            <h4>CSS</h4>
                            <AceEditor
                                mode="css"
                                value={css}
                                onChange={(value) => setCss(value)}
                                name="css-editor"
                                ref={cssEditorRef}
                                {...editorProps}
                            />
                        </div>
                        <div className="editor js">
                            <h4>JavaScript</h4>
                            <AceEditor
                                mode="javascript"
                                value={js}
                                onChange={(value) => setJs(value)}
                                name="js-editor"
                                ref={jsEditorRef}
                                {...editorProps}
                            />
                        </div>
                    </div>
                )}
                {activeTab === 'output' && (
                    <div className="output-container">
                        <iframe
                            srcDoc={srcDoc}
                            title="output"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            width="100%"
                            height="100%"
                            className="output-iframe"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HtmlEditor;
