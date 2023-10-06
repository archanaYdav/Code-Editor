import React, { useEffect, useState } from 'react';
import Editor from "./Editor";
import useLocalStorage from '../hooks/useLocalStorage';

function App() {
  const [html, setHtml] = useLocalStorage('html', ''); // isme return krega [value, setValue] html = value ho jaaega and setHtml = setValue to first time to html = value 
  // console.log(useLocalStorage('html', ''));
  // console.log(html);
  // console.log(setHtml);
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcdoc, setSrcDocs] = useState('');

  useEffect(() => {
     const timeout = setTimeout(() => {
       setSrcDocs(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>   
       `);
     }, 250);

     return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor 
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor 
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor 
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcdoc={srcdoc}
          title='output'
          sandbox='allow-scripts'
          style={{border: "0px solid black"}}
          width="100%"
          height="100%"
          >
        </iframe>
      </div>
    </>
  );
}

export default App;
