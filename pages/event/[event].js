import Footer from "../../components/public/Footer";
import Navbar from "../../components/public/Navbar";
import Event from "../../components/public/Event";
import {useEffect, useState} from "react";
import schoolNewsService from "../../services/school-news/school-news-service";
import {useRouter} from "next/router";
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "@uiw/react-md-editor/dist/markdown-editor.css";
import "@uiw/react-markdown-preview/dist/markdown.css";

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    {ssr: false}
)


const Loading = () => {
    return (
        <div className="col-12 p-2 top-products h-25">
            <div className="rounded py-0 bg-whiterounded">
                <div className="loading h-100 rounded-top my-0 p-0"/>
                <div className="prod-desc py-2 px-3">
                    <p className="h-10 loading col-10"/>
                    <p className="loading h-10 mt-0 col-8"/>
                </div>
            </div>
        </div>
    )
}
const EventPart = () => {
    const router = useRouter();
    const [event, setEvent] = useState({})
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (router.query.event) {
            schoolNewsService.get(router.query.event)
                .then(res => {
                    setEvent(res.data);
                    setPageLoading(false);
                }).catch(e => console.log(e))
        }
    }, [router.query])

    const [events, setEvents] = useState([])

    const [eventsLoading, setEventsLoading] = useState(true)

    useEffect(() => {
        schoolNewsService.getAll().then((res) => {
            setEvents(res.data);
            setEventsLoading(false);
        }).catch((e) => console.log(e))
    }, [])

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div className="w-100">
            <Navbar/>
            <div className="mt-5 container  " style={{marginBottom: "10rem"}}>
                {
                    pageLoading ?
                        <Loading/> :
                        <>
                            <div>
                                <h2>{event.title}</h2>
                                <img
                                    src={event?.mainPicPath}
                                    alt="Welcome picture"
                                    style={{width: "100%", height: "30em"}}
                                    className="mt-5"
                                />
                                <p className="mt-3">
                                    {event.paragraphs && <div className="preview"
                                                              dangerouslySetInnerHTML={createMarkup(event?.paragraphs)}></div>
                                    }
                                </p>
                            </div>
                        </>
                }

                <div className="mt-5">
                    <div className="numan text-center font-weight-bold">
                        More School Events
                    </div>
                    {eventsLoading ?
                            <div
                                className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div key={item} className="col p-2 top-products">
                                        <div className="rounded py-0 bg-whiterounded">
                                            <div className="loading h-100 rounded-top my-0 p-0"/>
                                            <div className="prod-desc py-2 px-3">
                                                <p className="h-10 loading col-10"/>
                                                <p className="loading h-10 mt-0 col-8"/>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>:
                        <div className="mt-5 d-flex flex-wrap justify-content-center align-items-center team">
                            {
                                events.map(event => <Event event={event} key={event}/>)
                            }
                        </div>}
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export default EventPart;