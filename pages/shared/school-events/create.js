
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";
import SingleSubModuleLayoutEmployee from '../../../layouts/employee/SingleSubModule';

function Content() {

  const [text, setText] = useState("");

  const onInputChange = (value) => {
    setText(value);
  };
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-5">
          <h3>Post A new School Event</h3>
        </div>
      </div>
      <MDEditor onChange={onInputChange} value={text} />
    </div>
  );
}


const Page = () => {
  const [total, setTotal] = useState(0);

  return (
    <SingleSubModuleLayoutEmployee
      Content={<Content />}
      count={total}
      route={"/employee/news"}
      showFilter={false}
      name={"School Events"}
      status="new"
      hideAction={true}
      hideSearch={true}
    />
  )
}
export default Page;