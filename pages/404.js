import Head from 'next/head'
// import Navbar from '../components/navbar'
import Router from 'next/router';

export default function NotFound() {
    return (
        <div>
            <Head>
                <title>Page not found | MCS</title>
                <link rel="icon" href={"/favicon.ico"} />
            </Head>
            {/* <Navbar /> */}
            <div className="container-fluid bg-white px-3 px-sm-4 py-5 px-md-5" style={{ height: '100vh' }}>
                <div className="px-0 py-0 px-sm-2 px-md-4 px-md-5">
                    <div className="row">
                        <div className="col-sm-4 my-auto">
                            <p className="display-2 font-weight-bolder text-app-red">
                                <span style={{ borderBottom: "10px solid #31B0D5" }}>Opp</span>s!
                            </p>
                            <h3 className="mt-5 pb-2 text-secondary">We can't find the page you are looking for.</h3>
                        </div>
                        <div className="col-sm-7 mx-auto">
                            <img className="w-100 d-block" src={"/app-imgs/not-found.png"} alt="404 error" />
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <button className={"btn  btn-lg col-4"} style={{ backgroundColor: '#31B0D5', color: 'white', fontSize: '15px', textTransform: 'uppercase' }} onClick={() => Router.push('/')}>Go to home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}