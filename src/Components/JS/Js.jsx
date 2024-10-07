import React, { useState, useEffect, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import './js.css';
import Navbar from '../Navbar/Navbar';
import 'ace-builds/src-noconflict/ext-emmet';  // Emmet extension
import 'ace-builds/src-noconflict/ext-language_tools';

// Custom console to capture console.log outputs
const CustomConsole = ({ logs }) => (
    <div className="console-output">
        <h3>Console Output</h3>
        <div className="logs">
            {logs.map((log, index) => (
                <div key={index} className="log-entry">{log}</div>
            ))}
        </div>
    </div>
);

const JsEditorConsole = () => {
    const [jsCode, setJsCode] = useState(`console.log("Hello, World!");`);
    const [logs, setLogs] = useState([]);
    const consoleRef = useRef([]);

    // Capture console.log outputs
    const handleRunCode = () => {
        setLogs([]); // Clear logs before running
        consoleRef.current = [];

        try {
            // Override console.log to capture outputs
            const originalConsoleLog = console.log;
            console.log = (...args) => {
                consoleRef.current.push(args.join(' '));
                setLogs([...consoleRef.current]);
            };

            // Evaluate the code safely
            // eslint-disable-next-line no-eval
            eval(jsCode);

            // Restore the original console.log
            console.log = originalConsoleLog;
        } catch (error) {
            consoleRef.current.push(`Error: ${error.message}`);
            setLogs([...consoleRef.current]);
        }
    };

    return (
        <div className="main">
            <Navbar />
            <div className="container">
                <div className="editor-section">
                    <div className="title-div">
                        <h3>JavaScript Code Editor</h3>
                        <button onClick={handleRunCode} className="run-button">
                            Run Code
                        </button>
                    </div>
                    <AceEditor
                        mode="javascript"
                        theme="monokai"
                        onChange={setJsCode}
                        value={jsCode}
                        name="js-editor"
                        fontSize={16}
                        width="100%"
                        height="80vh"
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}
                    />

                </div>
                <div className="console-section">
                    <CustomConsole logs={logs} />
                </div>
            </div>
        </div>
    );
};

export default JsEditorConsole;
