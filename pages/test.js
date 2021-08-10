import { useState, useEffect } from "react";
import NotificationUsService from "../services/notifications/notifications"

const Page = () => {

    const [listening, setListening] = useState(false);
    const [data, setData] = useState([]);
    let eventSource = undefined;

    useEffect(() => {
        if (!listening) {
            eventSource = NotificationUsService.parentRegistration();

            eventSource.onopen = (event) => {
                console.log("connection opened")
            }

            eventSource.onmessage = (event) => {
                console.log("result", JSON.parse(event.data));
                setData(old => [...old, JSON.parse(event.data)])
            }

            eventSource.onerror = (event) => {
                console.log(event.target.readyState)
                if (event.target.readyState === EventSource.CLOSED) {
                    console.log('eventsource closed (' + event.target.readyState + ')')
                }
                eventSource.close();
            }

            setListening(true);
        }

        return () => {
            eventSource.close();
            console.log("eventsource closed")
        }

    }, [])

    return (
        <div className="App">
            <header className="App-header">
                Received Data
                {data.map(d =>
                    <span key={d.id}>{d.user.firstName + " " + d.user.lastName}</span>
                )}
            </header>
        </div>
    );
}

export default Page;