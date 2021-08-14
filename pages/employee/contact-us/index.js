import React from 'react';
import { useEffect, useState } from 'react';
import styles from "../../../styles/components/table.module.css";
import SingleSubModuleLayoutAdmin from "../../../layouts/admin/SingleSubModule";
import SingleSubModuleLayoutEmployee from "../../../layouts/employee/SingleSubModule";

import { dateFormat, sortData } from "../../../utils/functions";
// import { Th } from "../../../components/reusable/TableComponents";
import Pagination from "react-js-pagination";
import ContactUsService from "../../../services/messaging/contact-us-service";
import { system_users } from '../../../utils/constants';
import { useSelector } from 'react-redux';

const Table = ({ messages, setMessages, paginator, setPaginator }) => {
    const handlePageChange = (page) => {
        setPaginator({ ...paginator, ['page']: page });
    };

    const sortBy = (prop, order) => { setMessages(sortData(messages, prop, order)); }

    return (
        <React.Fragment>
            <table className={'table border rounded ' + styles.table} style={{ fontSize: '0.8em' }}>
                <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Name</th>
                        <th scope="col" className={styles.th}>Email</th>
                        <th scope="col" className={styles.th}>Message</th>
                        <th scope="col" className={styles.th}>Sent At</th>
                        <th scope="col" className={styles.th}>View More</th>
                    </tr>
                </thead>

                <tbody>
                    {messages && messages.map((message, index) => {
                        return (
                            <tr key={message._id}>
                                <th scope="row" className={styles.td}>
                                    <span className="text-uppercase">{index + 1}</span>
                                </th>
                                <td className={styles.td}>{message.names}</td>
                                <td className={styles.td}>{message.email || 'N/A'}</td>
                                <td className={styles.td}>{message.message || 'N/A'}</td>
                                <td className={styles.td}>{dateFormat(message.createdAt).onlyDate()}</td>
                                <td>  <button className="btn" onClick={() => Router.push("messages/reply")}><span className="mr-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="none" d="M0 0H24V24H0z" /><path d="M11 20L1 12l10-8v5c5.523 0 10 4.477 10 10 0 .273-.01.543-.032.81-1.463-2.774-4.33-4.691-7.655-4.805L13 15h-2v5zm-2-7h4.034l.347.007c1.285.043 2.524.31 3.676.766C15.59 12.075 13.42 11 11 11H9V8.161L4.202 12 9 15.839V13z" fill="#1A4894" /></svg></span></button></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

            <div className={"row justify-content-end mt-4 mb-4"}>
                <Pagination
                    activePage={paginator.page}
                    itemsCountPerPage={paginator.perPage}
                    totalItemsCount={paginator.total}
                    pageRangeDisplayed={paginator.range}
                    onChange={handlePageChange} />
            </div>
        </React.Fragment>
    );
}

const CategoriesTable = () => {

    const readStatus = false;
    const [messages, setMessages] = useState([]);
    const [searchMessages, setSearchMessages] = useState([]);
    const [paginator, setPaginator] = useState({ page: 0, perPage: 5, total: 0, range: 5 });
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const [totals, setTotals] = useState({ inBox: 0, replied: 0, unReplied: 0 });




    const getMessages = (page) => {
        ContactUsService.getAllByReadStatusPaginated(readStatus, page).then((res) => {
            setMessages(res.data.docs);
            setSearchMessages(res.data.docs);
            setPaginator({ ...paginator, total: res.data.totalItems, page: res.data.page });
        }).catch(e => console.log(e))
    }

    const getSearchMessages = (val, page) => {
        ContactUsService.search_paginated(val, page).then((res) => {
            setSearchMessages(res.data.docs);
            setPaginator({ ...paginator, total: res.data.totalItems, page: res.data.page });
        }).catch(e => console.log(e))
    }

    const getTotals = async () => {
        const totals = { inbox: 0, replied: 0, unReplied: 0 };
        try {
            totals.inbox = (await ContactUsService.getByReadStatusPaginated(false)).data.totalItems;
            totals.replied = (await ContactUsService.getByRepliedStatusPaginated(true)).data.totalItems;
            totals.unReplied = (await ContactUsService.getByRepliedStatusPaginated(false)).data.totalItems;
            setTotals(totals);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        getMessages(paginator.page);
        getTotals().then();
        if (!isSearch)
            getMessages(paginator.page);
        else getSearchMessages(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchMessages(messages);
            setIsSearch(false);
        } else {
            getSearchMessages(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getInitialData = () => {
        getMessages(paginator.page);
    }
    const panes = [
        { name: 'Inbox', count: totals.inbox, route: '/employee/contact-us' },
        { name: 'UnReplied', count: totals.unReplied, route: '/employee/contact-us/un-replied' },
        { name: 'Replied', count: totals.replied, route: '/employee/contact-us/replied' },
    ];

    const user = useSelector(state => state.authUser);
    return (
        user.category == system_users.ADMIN ?

            <SingleSubModuleLayoutAdmin
                Content={
                    <Table
                        messages={searchMessages}
                        setMessages={setSearchMessages}
                        getInitialData={getInitialData}
                        paginator={paginator}
                        setPaginator={setPaginator} />
                }
                isArray={true}
                showFilter={false}
                name={'Inbox'}
                setSearch={getSearchKey}
                status="new"
                panes={panes}
                route={"/employee/contact-us"}
                hideAction={true}
            /> :
            <SingleSubModuleLayoutEmployee
                Content={
                    <Table
                        messages={searchMessages}
                        setMessages={setSearchMessages}
                        getInitialData={getInitialData}
                        paginator={paginator}
                        setPaginator={setPaginator} />
                }
                panes={panes}
                isArray={true}
                showFilter={false}
                name={'Inbox'}
                setSearch={getSearchKey}
                status="new"
                route={"/employee/contact-us"}
                hideAction={true}
            />
    );
};

export default CategoriesTable;