import {useEffect, useState} from "react";
import schoolNewsService from "../../services/school-news/school-news-service";
import Event from "../public/Event";

export default function Events() {

    const [events, setEvents] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        schoolNewsService.getAll().then((res) => {
            setLoading(false);
            setEvents(res.data);
        }).catch((e) => console.log(e))
    }, [])


    const breakPoints = {
        560: {
            slidesPerView: 2,
        },
        767: {
            slidesPerView: 3,
        },
        900: {
            slidesPerView: 4,
        },
        1300: {
            slidesPerView: 5.2,
        },
    };

    const jumpToSlide = (slideNumber) => {
        // const swiper = document.querySelector(".popular-events-swiper").swiper;
        // swiper.slideTo(slideNumber, 1000, false);
    };

    return (
        <div className="px-lg-3 bg-light">
            <div className={"container-fluid  px-3 px-sm-4 px-lg-5 pt-5"}>
                <h3 className="numan text-center font-weight-bold">Latest School Events</h3>
                <div className="controls text-right px-3 col-sm-5 col-md-3 ml-auto mb-0">
                    <button
                        className="btn btn-default bg-white p-0  border rounded-0 rounded-right"
                        disabled={currentSlide === 0}
                        onClick={() => jumpToSlide(currentSlide - 1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
                        </svg>
                    </button>
                    <button
                        className="btn btn-default bg-white p-0 border rounded-0 border-left-0"
                        disabled={
                            currentSlide === events.length - 1 ||
                            currentSlide === events.length
                        }
                        onClick={() => jumpToSlide(currentSlide + 1)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
                        </svg>
                    </button>
                </div>
                <div
                    className={
                        "  p-0  mt-3 products-area pb-5 bg-light "
                    }
                >
                    {loading ? (
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
                        </div>
                    ) : (
                        <div className={"container"}>
                            <div
                                className="row">
                                {events.map((event, i) => (
                                    <Event event={event} autoResponsive={false} key={i}/>
                                ))
                                }
                            </div>
                        </div>
                        // <Swiper
                        //     className={"popular-events-swiper"}
                        //     slidesPerView={1}
                        //     breakpoints={breakPoints}
                        //     onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
                        //     onSwiper={(swiper) => true}
                        //     spaceBetween={5}
                        // >
                        //     {events.map((event, i) => (
                        //         <SwiperSlide key={event.id}>
                        //             <div className="p-2">
                        //                 <Event event={event}  autoResponsive={false}/>
                        //             </div>
                        //         </SwiperSlide>
                        //     ))}
                        // </Swiper>
                    )}
                </div>
            </div>
        </div>
    )
        ;
}
