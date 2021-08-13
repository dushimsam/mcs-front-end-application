import { map } from "jquery";
import { useEffect, useState } from "react";
import schoolNewsService from "../../services/school-news/school-news-service";
import Event from "../public/Event";

export default function Events() {

  const [events, setEvents] = useState([])

  useEffect(() => {
    schoolNewsService.getAll().then((res) => {
      setEvents(res.data)
    }).catch((e) => console.log(e))
  }, [])
  return (
    <div className="mt-5 container pt-5 pb-5" id="events">
      <h3 className="numan text-center">Latest School Events</h3>
      <div className="mt-5 d-flex flex-wrap justify-content-center align-items-center team">
        {
          events.map(event => <Event event={event} key={event} />)
        }

      </div>
    </div>
  );
}
