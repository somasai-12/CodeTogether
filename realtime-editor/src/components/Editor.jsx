//when strict mode is not enabled
import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../Actions";

const Editor = ({ socketRef, roomId }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });

      editorRef.current.on("change", (instance, changes) => {
        //console.log('changes', changes);
        const { origin } = changes;
        const code = instance.getValue();
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
        //console.log(code);
      });
    }
    init();
  }, []);

  return <textarea id="realtimeEditor"></textarea>;
};

// export default Editor //when strict mode is enabled
// import React, { useEffect, useRef } from 'react'; // 1. Import useRef
// import Codemirror from 'codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/edit/closebrackets';

// const Editor = () => {
//     const editorRef = useRef(null);

//     useEffect(() => {
//         if (editorRef.current) {
//             const editor = Codemirror.fromTextArea(editorRef.current, {
//                 mode: { name: 'javascript', json: true },
//                 theme: 'dracula',
//                 autoCloseTags: true,
//                 autoCloseBrackets: true,
//                 lineNumbers: true,
//             });

//             return () => {
//                 editor.toTextArea();
//             };
//         }
//     }, []);
//     return <textarea ref={editorRef} />;
// };

export default Editor;
