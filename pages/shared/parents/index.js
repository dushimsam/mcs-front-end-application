import React from 'react';
import { useEffect, useState } from 'react';
import styles from "../../../styles/components/table.module.css";
import ActionButtons from "../../../components/shared/ActionButtons";
// import {filterData, getFormattedDate, sortData} from "../../../utils/functions";
import ParentService from "../../../services/users/parent-service"
// import { Th } from "../../../components/shared/table/TableHead";
import Pagination from "react-js-pagination";
import { show_modal } from "../../../utils/modal-funs";
import SingleSubModuleLayoutAdmin from '../../../layouts/admin/SingleSubModule';
import SingleSubModuleLayoutEmployee from '../../../layouts/employee/SingleSubModule';

import ModalProfileDetails from '../../../components/shared/app-user-deatils';
import { dateFormat } from "../../../utils/functions"
import { system_users } from '../../../utils/constants';
import { useSelector } from 'react-redux';


const Table = ({ parents, setParents, paginator, setPaginator }) => {
    console.log(parents)
    const [item, setItem] = useState(null);
    const [fields, setFields] = useState(null)

    const handlePageChange = (page) => {
        setPaginator({ ...paginator, ['page']: page });
    };

    const [alert, setAlert] = useState({ message: "", class: "", show: false })

    const sortBy = (prop, order) => {
        setParents(sortData(parents, prop, order));
    }

    const handleSetItem = (item, status) => {
        setItem(item);
        show_modal('#profileModalDetails')
    }


    return (
        <React.Fragment>
            <table className={'table border rounded ' + styles.table} style={{ fontSize: '0.8em' }}>
                <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>PROFILE</th>
                        <th scope="col" className={styles.th}>FIRST NAME</th>
                        <th scope="col" className={styles.th}>LAST NAME</th>
                        <th scope="col" className={styles.th}>EMAIL</th>
                        <th scope="col" className={styles.th}>MOBILE</th>
                        <th scope="col" className={styles.th}>GENDER</th>
                        <th scope="col" className={styles.th}>Status</th>
                        <th scope="col" className={styles.th}>Create At</th>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {parents && parents.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <th scope="row" className={styles.td}><span className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{item.user.profile}</td>
                                <td className={styles.td}>{item.user.firstName}</td>
                                <td className={styles.td}>{item.user.lastName}</td>
                                <td className={styles.td}>{item.user.email}</td>
                                <td className={styles.td}>{item.user.mobile || 'N/A'}</td>
                                <td className={styles.td}>{item.user.gender || 'N/A'}</td>
                                <td className={styles.td}>
                                    <span className={(!item.user.isLocked) ? styles.active : styles.inactive}>
                                        {(!item.user.isLocked) ? "A" : "D"}
                                    </span>
                                </td>
                                <td className={styles.td}>{dateFormat(item.createdAt).onlyDate()}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={item} allowed={["READ_MORE"]} /></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>

            <div className={"row justify-content-end mt-4 mb-4"}>
                <Pagination activePage={paginator.page} itemsCountPerPage={paginator.perPage} totalItemsCount={paginator.total} pageRangeDisplayed={paginator.range} onChange={handlePageChange} />
            </div>
            {item && <ModalProfileDetails item={item} category={"PARENT"} />}

        </React.Fragment>
    );
}



const ParentsTable = () => {

    const [parents, setParents] = useState([]);
    const [searchParents, setSearchparents] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginator, setPaginator] = useState({ page: 1, perPage: 5, total: 0, range: 5 });
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    let all = [];

    const getParents = (page) => {
        ParentService.getAll()
            .then((res) => {
                setTotal(res.data.length)
                setParents(res.data)
                setSearchparents(res.data)
            }).catch(e => console.log(e))
        // parentservice.getPaginated(page).then((res) => {
        //     setParents(res.data.docs);
        //     setSearchparents(res.data.docs);
        //     setTotal(res.data.totalDocs);
        //     setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        // }).catch(e => console.log(e))
    }
    const getSearchparents = (val, page) => {
        // parentservice.searchPaginated(val, page).then((res) => {
        //     setSearchparents(res.data.docs);
        //     setPaginator({...paginator, total: res.data.totalDocs, page: res.data.page});
        // }).catch(e => console.log(e))
    }

    useEffect(() => {
        getParents(paginator.page);
        // if (!isSearch)
        //     getParents(paginator.page);
        // else getSearchparents(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        // setSearchKey(val);
        // if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
        //     setSearchparents(parents);
        //     setIsSearch(false);
        // } else {
        //     getSearchparents(val, paginator.page);
        //     setIsSearch(true);
        // }
    };

    const getFilterKey = (key) => {
        // setSearchparents(filterData(parents, 'status', key));
    }
    const getInitialData = () => {
        // getParents(paginator.page);
    }

    const user = useSelector(state => state.authUser);

    return (

        user.category == system_users.ADMIN ?
            <SingleSubModuleLayoutAdmin
                Content={<Table parents={searchParents} getInitialData={getInitialData}
                    setParents={setSearchparents} paginator={paginator} setPaginator={setPaginator} />}
                count={total}
                route={"/shared/parents"}
                showFilter={true}
                setSearch={getSearchKey}
                setFilter={getFilterKey}
                name={"parents"}
                status="new"
                hideAction={true}
            /> :
            <SingleSubModuleLayoutEmployee
                Content={<Table parents={searchParents} getInitialData={getInitialData}
                    setParents={setSearchparents} paginator={paginator} setPaginator={setPaginator} />}
                count={total}
                route={"/shared/parents"}
                showFilter={true}
                setSearch={getSearchKey}
                setFilter={getFilterKey}
                name={"parents"}
                status="new"
                hideAction={true}
            />


    );
};


export default ParentsTable;