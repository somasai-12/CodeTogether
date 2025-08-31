// import React, { useEffect } from 'react'
// import Codemirror from 'codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/theme/dracula.css';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/edit/closebrackets';

// const Editor = () => {

//     useEffect(()=>{
//         async function init() {
//             Codemirror.fromTextArea(document.getElementById('realtimeEditor'), {
//                 mode: {name: 'javascript', json:true},
//                 theme: 'dracula',
//                 autoCloseTags : true,
//                 autoCloseBrackets: true,
//                 lineNumbers: true
//             });
//         }
//         init();
//     },[]);

//     return <textarea id='realtimeEditor'></textarea>
// };

// export default Editor
import React, { useEffect, useRef } from 'react'; // 1. Import useRef
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current) {
            const editor = Codemirror.fromTextArea(editorRef.current, { 
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });

            return () => {
                editor.toTextArea();
            };
        }
    }, []); 
    return <textarea ref={editorRef} />;
};

export default Editor;