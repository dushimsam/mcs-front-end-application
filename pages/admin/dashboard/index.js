import { useState } from "react";
import AdminDashboard from "../../../components/dashboards/AdminDashboard"
import LinearChart from "../../../components/dashboards/charts/LinearChart";

const Dashboard = () => {
    const [showTrafficOf, setShowTrafficOf] = useState("month")
    const [statistics, setStatistics] = useState(null)


    const getTrafficToShow = () => {
        if (statistics) {
            if (showTrafficOf === "month") {
                return [
                    { day: "1", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[0] },
                    { day: "2", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[1] },
                    { day: "3", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[2] },
                    { day: "4", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[3] },
                    { day: "5", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[4] },
                    { day: "6", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[5] },
                    { day: "7", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[6] },
                    { day: "8", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[7] },
                    { day: "9", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[8] },
                    { day: "10", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[9] },
                    { day: "11", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[10] },
                    { day: "12", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[11] },
                    { day: "13", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[12] },
                    { day: "14", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[13] },
                    { day: "15", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[14] },
                    { day: "16", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[15] },
                    { day: "17", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[16] },
                    { day: "18", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[17] },
                    { day: "19", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[18] },
                    { day: "20", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[19] },
                    { day: "21", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[20] },
                    { day: "22", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[21] },
                    { day: "23", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[22] },
                    { day: "24", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[23] },
                    { day: "25", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[24] },
                    { day: "26", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[25] },
                    { day: "27", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[26] },
                    { day: "28", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[27] },
                    { day: "29", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[28] },
                    { day: "30", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[29] },
                    { day: "31", visits: statistics.siteVisitors.currentMonth.perMonthDay.totals[30] }
                ]
            } else if (showIncomeOf === "year") {
                return [
                    { day: "January", visits: statistics.siteVisitors.currentYear.perMonth.totals[0] },
                    { day: "February", visits: statistics.siteVisitors.currentYear.perMonth.totals[1] },
                    { day: "March", visits: statistics.siteVisitors.currentYear.perMonth.totals[2] },
                    { day: "April", visits: statistics.siteVisitors.currentYear.perMonth.totals[3] },
                    { day: "May", visits: statistics.siteVisitors.currentYear.perMonth.totals[4] },
                    { day: "June", visits: statistics.siteVisitors.currentYear.perMonth.totals[5] },
                    { day: "July", visits: statistics.siteVisitors.currentYear.perMonth.totals[6] },
                    { day: "August", visits: statistics.siteVisitors.currentYear.perMonth.totals[7] },
                    { day: "September", visits: statistics.siteVisitors.currentYear.perMonth.totals[8] },
                    { day: "October", visits: statistics.siteVisitors.currentYear.perMonth.totals[9] },
                    { day: "November", visits: statistics.siteVisitors.currentYear.perMonth.totals[10] },
                    { day: "December", visits: statistics.siteVisitors.currentYear.perMonth.totals[11] }

                ]
            }
        } else return []
    }


    return (
        <AdminDashboard>
            <div className="row mx-0 mt-5">
                <div className="col-12 col-lg-8">
                    <div className="card shadow-sm mt-4" style={{ height: 390 }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5 className="mb-5">Site traffic</h5>
                                <div>
                                    <button
                                        onClick={() => setShowTrafficOf("month")}
                                        className={"btn btn-sm mr-3 px-3 " + ((showTrafficOf === "month") ? "btn-danger shadow" : "btn-light border text-danger")}>Month
                                    </button>
                                    <button
                                        onClick={() => setShowTrafficOf("year")}
                                        className={"btn btn-sm mr-3 px-3 " + ((showTrafficOf === "year") ? "btn-danger shadow" : "btn-light border text-danger")}>Year
                                    </button>
                                </div>
                            </div>
                            <LinearChart data={getTrafficToShow()} position="day*visits" />
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboard>
    )
}

export default Dashboard;