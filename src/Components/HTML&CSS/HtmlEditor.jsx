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
    const [html, setHtml] = useState('<h1>Let\'s Learn HTML</h1> ');
    const [css, setCss] = useState('h1 { color: Green; }');
    const [js, setJs] = useState('console.log("Hello World");');
    const [srcDoc, setSrcDoc] = useState('');
    const [activeTab, setActiveTab] = useState('html');

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
        height: "91vh",
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
                        className={`tab ${activeTab === 'html' ? 'active' : ''}`}
                        onClick={() => setActiveTab('html')}
                    >
                        HTML
                    </button>
                    <button
                        className={`tab ${activeTab === 'css' ? 'active' : ''}`}
                        onClick={() => setActiveTab('css')}
                    >
                        CSS
                    </button>
                    <button
                        className={`tab ${activeTab === 'js' ? 'active' : ''}`}
                        onClick={() => setActiveTab('js')}
                    >
                        JavaScript
                    </button>
                    <button
                        className={`tab ${activeTab === 'output' ? 'active' : ''}`}
                        onClick={() => setActiveTab('output')}
                    >
                        Output
                    </button>
                </div>
                {activeTab === 'html' && (
                    <div className="editor-container">
                   
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
                )}
                {activeTab === 'css' && (
                    <div className="editor-container">
                      
                        <AceEditor
                            mode="css"
                            value={css}
                            onChange={(value) => setCss(value)}
                            name="css-editor"
                            ref={cssEditorRef}
                            {...editorProps}
                        />
                    </div>
                )}
                {activeTab === 'js' && (
                    <div className="editor-container">
                        
                        <AceEditor
                            mode="javascript"
                            value={js}
                            onChange={(value) => setJs(value)}
                            name="js-editor"
                            ref={jsEditorRef}
                            {...editorProps}
                        />
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
