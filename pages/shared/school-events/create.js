
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";
import SingleSubModuleLayoutEmployee from '../../../layouts/employee/SingleSubModule';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import Styles from "../../../styles/components/editor.module.css"
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)


const SchoolNewsCreateContainer = () => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  const handleEditorChange = (editorState) => {
    setEditorState(editorState)
    convertContentToHTML();
  }

  const [convertedContent, setConvertedContent] = useState(null);

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-6">
          <h4> CREATE SCHOOL NEWS POST</h4>
        </div>
      </div>
      <div className="row justify-content-center">
        <EditorContainer editorState={editorState} handleEditorChange={handleEditorChange} />
      </div>
      <div className="row justify-content-center">
        <Preview convertedContent={convertedContent} createMarkup={createMarkup} />
      </div>
      <div className="row justify-content-center">
        <div className="col-4 mt-3">
          <button type="button" className="btn" style={styles.saveBtn}>
            <span className={"mr-3"} style={styles.nextText}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0h24v24H0z" /><path d="M18 21v-8H6v8H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h13l4 4v13a1 1 0 0 1-1 1h-2zm-2 0H8v-6h8v6z" fill="rgba(255,255,255,1)" /></svg></span><span>SAVE</span>
          </button>
        </div>
        </div>
      </div>
      )
}
      const EditorContainer = ({editorState, handleEditorChange}) => {
  return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            {
              editorState ?
                <Editor
                  defaultEditorState={editorState}
                  editorState={editorState}
                  onEditorStateChange={handleEditorChange}
                  wrapperClassName={Styles.eventEditorWrapperClass}
                  editorClassName={Styles.eventEditorClass}
                  toolbarClassName={Styles.toolbarClass}
                /> : <></>
            }
          </div>
        </div>
      </div>
      )
}

      const Preview = ({createMarkup, convertedContent}) => {
  return (
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-3">
            <h3>PREVIEW THE OUT PUT</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
          </div>
        </div>
      </div>
      )
}



const Page = () => {
  const [total, setTotal] = useState(0);

      return (
      <SingleSubModuleLayoutEmployee
        Content={<SchoolNewsCreateContainer />}
        count={total}
        route={"/shared/school-events"}
        showFilter={false}
        name={"School Events"}
        status="new"
        hideAction={true}
        hideSearch={true}
      />
      )
}
      export default Page;


      const styles = {
        nextBtn: {
        backgroundColor: "#1A4894",
      color: "white"
  },
      saveBtn: {
        backgroundColor: "#1A4894",
      color: "white",
      borderRadius: "0.5em",
      paddingLeft: "3em",
      paddingRight: "3em",
      width: "12em"
  },
      nextText: {
        fontWeight: "bold",
      fontSize: "1em"
  },
}
