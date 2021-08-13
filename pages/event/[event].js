import Footer from "../../components/public/Footer";
import Navbar from "../../components/public/Navbar";
import Image from "next/image";
import Event from "../../components/public/Event";
import { useEffect, useState } from "react";
import schoolNewsService from "../../services/school-news/school-news-service";
import { useRouter } from "next/router";
import DOMPurify from 'dompurify';
import { convertToHTML } from 'draft-convert';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)


const EventPart = () => {
  const router = useRouter();
  const [event, setEvent] = useState({})

  useEffect(() => {
    if (router.query.event) {
      schoolNewsService.get(router.query.event)
        .then(res => setEvent(res.data)).catch(e => console.log(e))
    }
  }, [router.query])

  const [events, setEvents] = useState([])

  useEffect(() => {
    schoolNewsService.getAll().then((res) => {
      setEvents(res.data)
    }).catch((e) => console.log(e))
  }, [])

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }
  return (
    <div className="w-100">
      <Navbar />
      <div className="mt-5 container w-100" style={{ marginBottom: "10rem" }}>
        <div>
          <h2>{event.title}</h2>
          <img
            src={event?.mainPicPath}
            alt="Welcome picture"
            style={{ width: "100%", height: "30em" }}
            className="mt-5"
          />
          <p className="mt-3">
            {event.paragraphs && <div className="preview" dangerouslySetInnerHTML={createMarkup(event?.paragraphs)}></div>
            }
          </p>
        </div>
        <div className="mt-5">
          <div className="numan text-center font-weight-bold">
            More School Events
          </div>
          <div className="mt-5 d-flex flex-wrap justify-content-center align-items-center team">
            {
              events.map(event => <Event event={event} key={event} />)
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}



export default EventPart;