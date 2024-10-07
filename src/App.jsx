import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HtmlEditor from './Components/HTML&CSS/HtmlEditor';
import Js from './Components/JS/Js';


const App = () => {
  return (      
      <Routes>
        <Route path="/" element={<HtmlEditor />} />
        <Route path="/js" element={<Js />} />
      </Routes>
  );
};

export default App;

