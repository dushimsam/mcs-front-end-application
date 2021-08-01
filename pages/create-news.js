// import React, { Component, useEffect, useState } from 'react';
// import { render } from 'react-dom';
// import { EditorState } from "draft-js";
// import dynamic from 'next/dynamic';


// const Editor = dynamic(
//     () => import('react-draft-wysiwyg').then(mod => mod.Editor),
//     { ssr: false }
// )
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// function uploadImageCallBack(file) {
//     return new Promise(
//         (resolve, reject) => {
//             const xhr = new XMLHttpRequest();
//             xhr.open('POST', 'https://api.imgur.com/3/image');
//             xhr.setRequestHeader('Authorization', 'Client-ID ##clientid##');
//             const data = new FormData();
//             data.append('image', file);
//             xhr.send(data);
//             xhr.addEventListener('load', () => {
//                 const response = JSON.parse(xhr.responseText);
//                 console.log(response)
//                 resolve(response);
//             });
//             xhr.addEventListener('error', () => {
//                 const error = JSON.parse(xhr.responseText);
//                 console.log(error)
//                 reject(error);
//             });
//         }
//     );
// }

// const EditorContainer = () => {

//     const [editorState, setEditorState] = useState()

//     useEffect(() => { setEditorState(EditorState.createEmpty()) }, []);


//     const onEditorStateChange = (newState) => {
//         // console.log(editorState)
//         setEditorState(newState)
//     };

//     return (
//         <>
//             <Editor
//                 editorState={editorState}
//                 toolbarClassName="toolbar-class"
//                 wrapperClassName="wrapper-class"
//                 editorClassName="editor-class"
//                 onEditorStateChange={onEditorStateChange}
//                 // toolbarOnFocus
//                 toolbar={{
//                     options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
//                     inline: { inDropdown: true },
//                     list: { inDropdown: true },
//                     textAlign: { inDropdown: true },
//                     link: { inDropdown: true },
//                     history: { inDropdown: true },
//                     image: {
//                         urlEnabled: true,
//                         uploadEnabled: true,
//                         uploadCallback: uploadImageCallBack,
//                         previewImage: true,
//                         alt: { present: false, mandatory: false }
//                     },
//                 }}
//             />
//         </>
//     )
// }


// export default EditorContainer;








