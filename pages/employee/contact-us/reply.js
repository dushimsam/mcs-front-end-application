import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EditorState } from "draft-js";
// import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import Styles from "../../../styles/components/editor.module.css";
import SingleSubModuleLayoutAdmin from "../../../layouts/admin/SingleSubModule";
import SingleSubModuleLayoutEmployee from "../../../layouts/employee/SingleSubModule";
import CustomerReviewsService from "../../../services/feedbacks/CustomerReviewsService";
import ContactUsService from "../../../services/feedbacks/ContactUsService";
import { system_users } from "../../../utils/constants";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const MessageContainerHeader = () => {
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-4">
          <h3>Kamanzi Eloi</h3>
          <h5>kamanzi@gmail.com</h5>
        </div>
        <div className="col-3">
          <p>14. September 2021</p>
        </div>
      </div>
    </div>
  );
};

const MessageBody = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 overflow-auto">
          <p>
            To get underway, we will need to make some edits to the src/App.js
            file. We will require the editor component and styles from
            react-draft-wysiwyg as well as EditorState from Draft.js. The editor
            component uses the default Draft.js editor without any styling. The
            Draft.js editor is built as a controlled ContentEditable component
            that is based on React’s controlled input API. EditorState provides
            a snapshot of the editor state. This includes the undo/redo history,
            contents, and cursor. Let’s add some initial changes to display the
            editor:
          </p>
        </div>
      </div>
    </div>
  );
};

const MessageUtils = ({ showReply, setShowReply }) => {
  return (
    <div className="container mt-3">
      <div className="row justify-content-between">
        <div className="col-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowReply(!showReply)}
          >
            <span className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0H24V24H0z" />
                <path
                  d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81-1.463-2.774-4.33-4.691-7.655-4.805L13 15h-2v5zm-2-7h4.034l.347.007c1.285.043 2.524.31 3.676.766C15.59 12.075 13.42 11 11 11H9V8.161L4.202 12 9 15.839V13z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </span>
            <span>Reply</span>
          </button>
        </div>
        <div className="col-3">
          <button className="btn btn-danger">
            <span className="mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </span>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};
const MessageContainer = ({ showReply, setShowReply }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <MessageContainerHeader />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <MessageBody />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <MessageUtils showReply={showReply} setShowReply={setShowReply} />
        </div>
      </div>
    </div>
  );
};

const MessageReplyContainer = ({ editorState, onEditorStateChange }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          <h4> Write A reply</h4>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10">
          {editorState ? (
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName={Styles.wrapperClass}
              editorClassName={Styles.editorClass}
              toolbarClassName={Styles.toolbarClass}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-4 mt-3">
          <button type="button" className="btn" style={styles.saveBtn}>
            <span className={"mr-3"} style={styles.nextText}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="rgba(255,255,255,1)"
                />
              </svg>
            </span>
            <span>SEND</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [showReply, setShowReply] = useState(false);

  const [totals, setTotals] = useState({ customerReviews: 0, contactUs: 0 });

  const getTotals = async () => {
    const totals = { customerReviews: 0, contactUs: 0 };
    try {
      totals.customerReviews = (
        await CustomerReviewsService.get_all_paginated()
      ).data.totalDocs;
      totals.contactUs = (
        await ContactUsService.get_all_paginated()
      ).data.totalDocs;

      setTotals(totals);
    } catch (e) {
      console.log(e);
    }
  };
  const panes = [
    { name: "Inbox", count: totals.inbox, route: "/employee/contact-us" },
    {
      name: "UnReplied",
      count: totals.unReplied,
      route: "/employee/contact-us/un-replied",
    },
    {
      name: "Replied",
      count: totals.replied,
      route: "/employee/contact-us/replied",
    },
  ];

  useEffect(() => {
    getTotals().then();
  }, []);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const getSearchKey = () => {};

  const user = useSelector((state) => state.authUser);
  return user.category == system_users.ADMIN ? (
    <SingleSubModuleLayoutAdmin
      Content={
        <div className="container mt-3 mb-5">
          <div className="row">
            <MessageContainer
              showReply={showReply}
              setShowReply={setShowReply}
            />
          </div>
          <div className="row">
            {showReply ? (
              <MessageReplyContainer
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      }
      isArray={true}
      showFilter={false}
      name={"Inbox"}
      setSearch={getSearchKey}
      status="new"
      panes={panes}
      route={"/employee/contact-us"}
      hideAction={true}
    />
  ) : (
    <SingleSubModuleLayoutEmployee
      Content={
        <div className="container mt-3 mb-5">
          <div className="row">
            <MessageContainer
              showReply={showReply}
              setShowReply={setShowReply}
            />
          </div>
          <div className="row">
            {showReply ? (
              <MessageReplyContainer
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      }
      panes={panes}
      isArray={true}
      showFilter={false}
      name={"Inbox"}
      setSearch={getSearchKey}
      status="new"
      route={"/employee/contact-us"}
      hideAction={true}
    />
  );
};

export default Page;

const styles = {
  nextBtn: {
    backgroundColor: "#1A4894",
    color: "white",
  },
  saveBtn: {
    backgroundColor: "#1A4894",
    color: "white",
    borderRadius: "0.5em",
    paddingLeft: "3em",
    paddingRight: "3em",
    width: "12em",
  },
  nextText: {
    fontWeight: "bold",
    fontSize: "1em",
  },
};
