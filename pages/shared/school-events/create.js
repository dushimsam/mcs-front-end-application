
import React, { useEffect, useRef, useState } from "react";
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";
import SingleSubModuleLayoutEmployee from '../../../layouts/employee/SingleSubModule';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import { EditorState } from 'draft-js';
import styles from "../../../styles/components/editor.module.css"
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import cloudinary from "../../../services/cloudinary";
import { useSelector } from "react-redux";
import schoolEmployeeService from "../../../services/users/school-employee-service";
import schoolNewsService from "../../../services/school-news/school-news-service";
import { notifyError, notifySuccess } from "../../../utils/alerts"

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)


const SchoolNewsCreateContainer = ({ editorState, setEditorState, saveFn, setCurrStep }) => {

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
      <div className="row">
        <div className="col-12">
          <BtnSteps backStep={"IMAGE"} saveFn={saveFn} setCurrStep={setCurrStep} />
        </div>
      </div>
    </div>
  )
}
const EditorContainer = ({ editorState, handleEditorChange }) => {
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
                wrapperClassName={styles.eventEditorWrapperClass}
                editorClassName={styles.eventEditorClass}
                toolbarClassName={styles.toolbarClass}
              /> : <></>
          }
        </div>
      </div>
    </div>
  )
}

const Preview = ({ createMarkup, convertedContent }) => {
  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-3">
          <h6>PREVIEW THE OUTPUT</h6>
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

const NewsTitle = ({ setNewsTitle, newsTitle, setCurrStep }) => {

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-5">
          <h3>News Title</h3>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-7">
          <div className="form-group row">
            <input
              type="text"
              onChange={(event) => setNewsTitle(event.target.value)}
              value={newsTitle}
              className={"form-control form-control-sm"}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <BtnSteps nextStep={"IMAGE"} setCurrStep={setCurrStep} />
      </div>
    </div>
  )
}


const ImagesSuperContainer = ({ imgFiles, imagesContainer, handleUploadPictures, setCurrStep }) => {
  // const [ deleteFiles, setDeleteFiles ] = useState([])
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="form-group col-5">
            <label htmlFor="images">
              <h6 className={"font-weight-bold"}>Add Pictures</h6>
            </label>
            <input
              type="file"
              className="form-control-file"
              hidden={true}
              name="images"
              id="images"
              ref={imagesContainer}
              multiple={true}
              onChange={handleUploadPictures}
            /><br />
            <div className="bg-secondary d-inline-block p-4 cursor-pointer rounded shadow-sm" onClick={() => {
              document.getElementById("images").click()
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                  fill="rgba(236,240,241,1)" />
              </svg>
            </div>
          </div>
          <div className="form-group">
            {imgFiles && (
              <>
                <CreateImagesContainer
                  files={imgFiles}
                  status={"create"}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <BtnSteps nextStep={"CREATE"} backStep={"TITLE"} setCurrStep={setCurrStep} />
        </div>
      </div>
    </div>
  )
}



const CreateImagesContainer = ({ files }) => {
  const [allFiles, setAllFiles] = useState(Array.from(files))

  useEffect(() => {
    setAllFiles(files)
  }, [files])
  const [deleteFiles, setDeleteFiles] = useState([]);

  const removeSelected = () => {
    deleteFiles.forEach((value, index) => {
      console.log(files[value])
    })
  }

  useEffect(() => {
    // console.log("HERE THE DELETE FILES ", deleteFiles)
  }, [deleteFiles])

  return (

    <div className={"card"}>
      <div className="card-header">
        <div className="d-flex justify-content-between">
          <h6 className="font-weight-bold">{"Images you selected"}</h6>
          <div>{deleteFiles.length > 0 && (
            <a href="#" className="text-danger" onClick={() => removeSelected()}>Remove selected</a>)}</div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          {
            Object.keys(allFiles).map(function (file, index) {
              return (
                <SingleImagePart
                  key={file}
                  files={files}
                  status={"create"}
                  setDeleteFiles={setDeleteFiles}
                  deleteFiles={deleteFiles}
                  fileIndex={index} />
              )
            })
          }
        </div>
      </div>
    </div>)
}



const SingleImagePart = ({ files, fileIndex, path, setDeleteFiles, deleteFiles = [] }) => {
  const [img, setImg] = useState(null)
  const [selected, setSelected] = useState(false)

  useEffect(() => {

    if (files[fileIndex]) {
      let reader = new FileReader();
      reader.onload = function (evt) {
        setImg(evt.target.result)
      }
      reader.onerror = function (evt) {
        console.log(evt)
      }

      reader.readAsDataURL(files[fileIndex])
    }
  }, [files, path])


  const handleSetDeleteFile = (choiceState) => {
    if (!choiceState) {
      setDeleteFiles([...deleteFiles, fileIndex])
    } else {
      const array = [...deleteFiles];
      const index = array.indexOf(parseInt(fileIndex));
      if (index !== -1) {
        array.splice(index, 1);
        setDeleteFiles(array);
      }
    }
  }

  return (
    <div className={"col-2 rounded m-1"} style={selected ? otherStyles.imgDivClicked : otherStyles.imgDivUnClicked}>
      <img src={img} id="imageSpace" className="img-fluid my-3 rounded-sm shadow" style={otherStyles.img}
        alt="spare-part-image" onClick={() => {
          setSelected(!selected);
          handleSetDeleteFile(selected)
        }} />
    </div>
  )
}


const BtnSteps = ({ setCurrStep, nextStep, backStep, saveFn }) => {
  return (
    <div className="row  justify-content-md-between mt-4">
      {backStep &&
        <div className="col-md-3 col-6 pl-md-5">
          <button type="button" className="btn ml-md-5" onClick={() => setCurrStep(backStep)}>
            <span className="mr-2" style={Styles.backIcon}>&lt;</span> <span style={Styles.backText}>BACK</span>
          </button>
        </div>
      }
      {nextStep ? <div className="col-md-2 col-5">
        <button type="button" className="btn" style={Styles.nextBtn} onClick={() => setCurrStep(nextStep)}>
          <span style={Styles.nextText} className="mr-2">NEXT</span><span style={Styles.nextIcon}>&gt;</span>
        </button>
      </div> : <div className="col-md-7 col-5 pr-md-5">
        <button type="button" className="btn" onClick={() => saveFn()} style={Styles.saveBtn}>
          <span style={Styles.nextText}>SAVE</span>
        </button>
      </div>}
    </div>
  )
}

const NewsStep = ({ employee }) => {
  const [newsTitle, setNewsTitle] = useState(null)
  const [newsParagraphs, setNewsParagraphs] = useState(null)
  const [currStep, setCurrStep] = useState("TITLE")
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  let imagesContainer = useRef(null);

  const [imgFiles, setImgFiles] = useState(null)

  const handleUploadPictures = () => {
    let files = imagesContainer.current.files
    setImgFiles(files)
  }

  const [imageUrls, setImageUrls] = useState([])

  console.log(imageUrls)
  const saveNews = () => {

    // for (let i = 0; i < imgFiles.length; i++) {
    const formData = new FormData();
    formData.append("file", imgFiles[0]);
    formData.append("upload_preset", "flhyd7jb")
    cloudinary.post(formData)
      .then((res) => {
        schoolNewsService.post({ title: newsTitle, postedBy_employeeId: employee.id, mainPicPath: res.data.url, paragraphs: convertToHTML(editorState.getCurrentContent()) })
        notifySuccess("Successfully Created");
      })
      .catch((e) => notifyError(e))

  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          {
            currStep === "TITLE" ?
              <NewsTitle newsTitle={newsTitle} setNewsTitle={setNewsTitle} setCurrStep={setCurrStep} /> :
              currStep === "IMAGE" ?
                <ImagesSuperContainer handleUploadPictures={handleUploadPictures}
                  imgFiles={imgFiles}
                  imagesContainer={imagesContainer} setCurrStep={setCurrStep} /> :
                <SchoolNewsCreateContainer editorState={editorState} setEditorState={setEditorState} saveFn={saveNews} setCurrStep={setCurrStep} />
          }
        </div>
      </div>
    </div>
  )
}

const Page = () => {
  const [total, setTotal] = useState(0);

  const user = useSelector(state => state.authUser);
  const [employee, setEmployee] = useState(0);

  useEffect(() => {
    schoolEmployeeService.getByUserId(user.id)
      .then((res) => setEmployee(res.data)).catch(e => console.log(e))
  }, [user])
  return (
    <SingleSubModuleLayoutEmployee
      Content={<NewsStep employee={employee} />}
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

const Styles = {
  closeModalIcon: {
    fontSize: "2em"
  },
  title: {
    color: "#1A4894",
    fontSize: "bold"
  },
  formLabel: {
    color: "#000000"
  },
  nextIcon: {
    fontWeight: "bold",
    fontSize: "1.5em"
  },
  nextBtn: {
    backgroundColor: "#1A4894",
    color: "white"
  },
  nextText: {
    fontWeight: "bold",
    fontSize: "1em"
  },
  select: {
    padding: "3px",
    fontWeight: "bold",
    borderRadius: "0.4em",
    border: "1px solid #1A4894"
  },
  badge: {
    position: "absolute",
    color: "white",
    right: 38,
    top: 10,
    height: 25,
    width: 25,
    fontSize: "1.1em",
    backgroundColor: "#1A4894"
  },
  saveBtn: {
    backgroundColor: "#1A4894",
    color: "white",
    borderRadius: "0.5em",
    paddingLeft: "3em",
    paddingRight: "3em",
    width: "12em"
  },

  backIcon: {
    color: "#1A4894",
    fontSize: "1em",
    fontWeight: "bold"
  },
  backText: {
    color: "#1A4894",
    fontSize: "0.9em",
    fontWeight: "bold"
  }
}

const otherStyles = {
  img: {
    border: "0.5em",
  },

  imgDivClicked: {
    border: "2px solid red",
  },
  imgDivUnClicked: {
    border: "0px solid black",
  }
}