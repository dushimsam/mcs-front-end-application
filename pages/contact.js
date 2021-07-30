import React, { Component } from 'react';
import styles from "../styles/components/table.module.css";

const items = [
    { name: "KostyaDanovsky", email: " schwart@mail.com", message: "Hey John,Aliquam eu facilisis eros, quis varius est.Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.", date: "10:05 AM November 22" },
    { name: "KostyaDanovsky", email: " schwart@mail.com", message: "Hey John,Aliquam eu facilisis eros, quis varius est.Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.", date: "10:05 AM November 22" },
    { name: "KostyaDanovsky", email: " schwart@mail.com", message: "Hey John,Aliquam eu facilisis eros, quis varius est.Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.", date: "10:05 AM November 22" },
    { name: "KostyaDanovsky", email: " schwart@mail.com", message: "Hey John,Aliquam eu facilisis eros, quis varius est.Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.", date: "10:05 AM November 22" },
    { name: "KostyaDanovsky", email: " schwart@mail.com", message: "Hey John,Aliquam eu facilisis eros, quis varius est.Consectetur adipiscing elit. Aliquam sodales sem in nibh pellentesque, ac dignissim mi dapibus.", date: "10:05 AM November 22" }

]
function Row({ email, name, message, date }) {
    return (
        <tr style={otherStyles.td}>
            <td className={styles.td}>{name}</td>
            <td className={styles.td}>{message.substring(0, 50)}</td>
            <td className={styles.td}>{email}</td>
            <td className={styles.td}>{date}</td>
        </tr>
    )
}
const Table = () => {
    return (
        <table style={{ fontSize: '0.8em', borderRadius: "2em", border: "5px solid black" }} className={'table border  rounded ' + styles.table} >
            <thead>
                <tr>
                    <th scope="col" className={styles.th}></th>
                    <th scope="col" className={styles.th}></th>
                    <th scope="col" className={styles.th}></th>
                    <th scope="col" className={styles.th}></th>
                    <th scope="col" className={styles.th}></th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((person, index) => <Row email={person.email} name={person.name} date={person.date} message={person.message} key={index} />)

                }
            </tbody>
        </table>
    )
}

const mainItems = [
    { name: "Inbox", value: "12" },
    { name: "Sent", value: "12" },
    { name: "Important", value: "12" }
]

const MainItems = ({ item }) => {
    return (
        <div className={"container"}>

            <div className={"row mt-3 cursor-pointer"}>
                <div className={"col-5"}>
                    <h6 className={"ml-2"}>{item.name}</h6>
                </div>
                <div className={"col-5"}>
                    <span className={"border rounded-circle  p-1"}>{item.value}</span>
                </div>
            </div>
        </div>
    )
}
const Container = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div>
                        <button className={"btn btn-dark btn-outline-light"}>
                            Compose
                        </button>
                    </div>
                    <div>
                        {
                            mainItems.map((item, index) => <MainItems key={index} item={item} />)
                        }
                    </div>
                </div>
                <div className="col-9">
                    <Table />
                </div>
            </div>
        </div>)
}
const otherStyles = {
    tr: {
        border: "5px solid black"
    }
}



const PersonInfo = () => {
    return (
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-3">
                    <h3>Samuel Dush</h3>
                    <p>3:30 AM November 19</p>
                </div>
                <div className="col-3">
                    <h5>sam@gmail.com</h5>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-10">
                    Hey John,
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ex mauris, ultrices vel lectus quis, scelerisque hendrerit ipsum. Suspendisse ullamcorper turpis neque, eget dapibus magna placerat ac. Suspendisse rhoncus ligula ac mi tempus varius ut sed lacus. Sed et commodo nulla, et placerat leo. Nam rhoncus vulputate sem non pharetra. Praesent fringilla massa in laoreet convallis. Aliquam lobortis dui a congue facilisis. Aenean dapibus semper semper. Quisque aliquam, nibh dapibus interdum condimentum, ex velit tempor tortor, at vestibulum magna leo quis leo. Morbi pulvinar varius erat ac rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst.
                    Cras rhoncus quam ipsum, vel dignissim nisl egestas sed. Aliquam erat volutpat. Integer eu nisl elit. Donec malesuada diam vitae tellus luctus tincidunt. Donec tempus blandit neque, rutrum egestas ipsum sagittis tempor. Curabitur volutpat ligula enim, nec vehicula purus molestie at. Sed a facilisis enim, nec molestie magna. Donec in augue non est viverra dapibus vel tempus risus. Nam porttitor purus sit amet hendrerit ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                </div>
            </div>
            <div className="row justify-content-between mt-3">
                <div className="col-5">
                    <button className="btn btn-info"><svg className={"mr-2"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0H24V24H0z" /><path d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81C19.46 16.95 16.458 15 13 15h-2v5z" fill="rgba(255,255,255,1)" /></svg> reply</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-danger"> delete</button>
                </div>
            </div>
        </div>
    )
}
export default PersonInfo;