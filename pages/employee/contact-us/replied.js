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
                        <th scope="col" className={styles.th}>Registered On</th>
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
    const [messages, setMessages] = useState([]);
    const [searchMessages, setSearchMessages] = useState([]);
    const [paginator, setPaginator] = useState({ page: 0, perPage: 5, total: 0, range: 5 });
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    const replyStatus = true;

    const [totals, setTotals] = useState({ customerReviews: 0, contactUs: 0 });


    const getMessages = (page) => {
        ContactUsService.getAllByRepliedStatusPaginated(replyStatus, page).then((res) => {
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
                name={'Replied'}
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
                name={'Replied'}
                setSearch={getSearchKey}
                status="new"
                route={"/employee/contact-us"}
                hideAction={true}
            />
    );
};

export default CategoriesTable;