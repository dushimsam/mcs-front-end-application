import React from 'react';
import { useEffect, useState } from 'react';
import styles from "../../../styles/components/table.module.css";
import ActionButtons from "../../../components/shared/ActionButtons";
import { filterData, sortData } from "../../../utils/functions";
import ParentService from '../../../services/users/parent-service';

// import { Th } from "../../../components/shared/table/TableHead";
import Pagination from "react-js-pagination";
import { show_modal } from "../../../utils/modal-funs";
import SingleSubModuleLayoutAdmin from '../../../layouts/admin/SingleSubModule';
import SingleSubModuleLayoutEmployee from '../../../layouts/employee/SingleSubModule';

import ModalProfileDetails from '../../../components/shared/app-user-deatils';
import { dateFormat } from "../../../utils/functions"
import { system_users } from '../../../utils/constants';
import { useSelector } from 'react-redux';
import Paginator from "../../../components/shared/tables/Paginator";


const Table = ({ parents, setParents, paginator, setPaginator ,paginatorLoading,setPaginatorLoading}) => {
    const [item, setItem] = useState(null);
    const [fields, setFields] = useState(null)

    const handlePageChange = (page) => {
        setPaginatorLoading(true);
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
            <div className={"table-responsive col-12"}>
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
            </div>
            <Paginator  paginator={paginator} handlePageChange={handlePageChange}
                        paginatorLoading={paginatorLoading}/>
            {item && <ModalProfileDetails item={item} UserObj={item.user} category={"PARENT"} />}

        </React.Fragment>
    );
}



const ParentsTable = () => {

    const [parents, setParents] = useState([]);
    const [searchParents, setSearchparents] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginator, setPaginator] = useState({ page: 0, perPage: 5, total: 0, range: 5 });
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');
    const [paginatorLoading, setPaginatorLoading] = useState(true);

    let all = [];

    const getParents = (page) => {
        ParentService.getAllByConfirmStatusPaginated(true, page).then((res) => {
            setParents(res.data.docs);
            setSearchparents(res.data.docs);
            setTotal(res.data.totalItems);
            setPaginator({ ...paginator, total: res.data.totalItems, page: res.data.page });
            setPaginatorLoading(false)
        }).catch(e => console.log(e))
    }
    const getSearchparents = (val, page) => {
        ParentService.searchPaginated(val, page).then((res) => {
            setSearchparents(res.data.docs);
            setPaginator({ ...paginator, total: res.data.totalItems, page: res.data.page });
            setPaginatorLoading(false)
        }).catch(e => console.log(e))
    }

    useEffect(() => {
        getParents(paginator.page);
        if (!isSearch)
            getParents(paginator.page);
        else getSearchparents(searchKey, paginator.page);
    }, [paginator.page]);

    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchparents(parents);
            setIsSearch(false);
        } else {
            getSearchparents(val, paginator.page);
            setIsSearch(true);
        }
    };

    const getFilterKey = (key) => {
        setSearchparents(filterData(parents, 'user.isLocked', key));
    }
    const getInitialData = () => {
        getParents(paginator.page);
    }


    const filters = [
        { name: 'ALL', val: 'ALL', title: "" },
        { name: 'ACTIVE', val: false, title: "Parents who are currently using the app" },
        { name: 'INACTIVE', val: true, title: "Parents who can not use the application" }
    ];

    const user = useSelector(state => state.authUser);

    return (

        user.category === system_users.ADMIN ?
            <SingleSubModuleLayoutAdmin
                Content={<Table parents={searchParents} getInitialData={getInitialData}
                    setParents={setSearchparents} paginator={paginator} setPaginator={setPaginator} paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}/>}
                count={total}
                route={"/shared/parents"}
                showFilter={true}
                setSearch={getSearchKey}
                setFilter={getFilterKey}
                name={"parents"}
                status="new"
                filters={filters}
                hideAction={true}
            /> :
            <SingleSubModuleLayoutEmployee
                Content={<Table parents={searchParents} getInitialData={getInitialData}
                    setParents={setSearchparents} paginator={paginator} setPaginator={setPaginator} paginatorLoading={paginatorLoading} setPaginatorLoading={setPaginatorLoading}/>}
                count={total}
                route={"/shared/parents"}
                showFilter={true}
                setSearch={getSearchKey}
                setFilter={getFilterKey}
                name={"parents"}
                filters={filters}
                status="new"
                hideAction={true}
            />


    );
};


export default ParentsTable;