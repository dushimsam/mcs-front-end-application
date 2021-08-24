import Link from "next/link";
import {BookOutlined, EditOutlined, TrophyOutlined} from "@ant-design/icons";


const styles = {
    root: {
        backgroundImage: `linear-gradient(to left, rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(/app-imgs/landing.jpg)`,
        backgroundSize: "cover",
        color: "white",
        minHeight: "35em"
    },
    main: {
        minHeight: "auto",
        paddingBottom: 'auto'
    },
    item: {
        minHeight: "250px",
    },
    btn: {
        backgroundColor: "white"
    },
    line: {
        width: "60%",
        height: "2px",
        backgroundColor: "white",
        borderRadius: "1px",
        margin: "10px auto"
    }
}


const WelcomeSection = () => {
    return (
        <div className="container" style={styles.root}>
            <div className={"row justify-content-center h-100"}>
                <div className={"col-md-6 col-11 align-self-center"}>
                   <span className={"h3 mr-3"}>WELCOME TO</span><span className={"font-weight-bold h1"}>MOUNT CARMEL SCHOOL</span><span className={"h3 ml-3"}>OFFICIAL WEBSITE</span>
                </div>
            </div>
        </div>
    )
}
export default function HeroSection() {
    return (
        <div className="container-fluid mb-3" id="home">

            <div className={"row"}>
                <WelcomeSection/>
            </div>
            <div className="row" style={{color: "#fff"}}>
                <div
                    className="col d-flex flex-column align-items-center justify-content-center pt-5 pb-5 "
                    style={{background: "#60CD96"}}
                >
                    <div>
                        <BookOutlined/>
                    </div>
                    <div className="pt-3 h4">Special Education</div>
                </div>
                <div
                    className="col d-flex flex-column align-items-center justify-content-center pt-5 pb-5 "
                    style={{background: "#69D2E7"}}
                >
                    <div>
                        <TrophyOutlined/>
                    </div>
                    <div className="pt-5 pb-5 h4">Qualified Teachers</div>
                </div>
                <div
                    className="col d-flex flex-column align-items-center justify-content-center pt-4 pb-4 "
                    style={{background: "#F98F6F"}}
                >
                    <div>
                        <EditOutlined/>
                    </div>
                    <div className="pt-3 h4">Interactive Calcula-Activities</div>
                </div>
                <div
                    className="col d-flex flex-column align-items-center justify-content-center pt-4 pb-4 font-weight-bold  "
                    style={{background: "#9D87C4"}}
                >
                    <div>
                        IN GOD <br/> We hope Wisdom & Knowledge{" "}
                    </div>
                    <Link href="#contact">
                        <a className=" border rounded-pill px-4 py-1 mt-3">Learn More</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}
