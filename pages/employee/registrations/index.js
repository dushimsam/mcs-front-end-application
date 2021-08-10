import React from 'react';
import { useEffect, useState } from 'react';
import styles from "../../../styles/components/table.module.css";
import ActionButtons from "../../../components/shared/ActionButtons";
// import {filterData, getFormattedDate, sortData} from "../../../utils/functions";
import ParentService from "../../../services/users/parent-service"
// import { Th } from "../../../components/shared/table/TableHead";
import { filterData, sortData } from "../../../utils/functions";
import Pagination from "react-js-pagination";
import { show_modal } from "../../../utils/modal-funs";
import SingleSubModuleLayoutAdmin from '../../../layouts/admin/SingleSubModule';
import SingleSubModuleLayoutEmployee from '../../../layouts/employee/SingleSubModule';
import ConfirmationModal from "../../../components/shared/tables/confirmation-modal";
import ModalProfileDetails from '../../../components/shared/app-user-deatils';
import { dateFormat } from "../../../utils/functions"
import { ALERT_EXPIRATION_PERIOD, system_users } from '../../../utils/constants';
import { useSelector } from 'react-redux';
import parentService from '../../../services/users/parent-service';
import userService from '../../../services/users/user-service';
import { alertSuccess, alertFailer } from '../../../utils/alerts';


const Table = ({ parents, setParents, paginator, setPaginator, refreshData }) => {
    console.log(parents)
    const [loading, setLoading] = useState(false);

    const [item, setItem] = useState(null);
    const [fields, setFields] = useState(null)
    const [confirm_parent, setConfirmParent] = useState({ item: {}, status: "" })

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

    const handleConfirmation = () => {

        if (confirm_parent.status) {
            userService.toggleConfirm(confirm_parent.item.user.id)
                .then(user => {
                    alertSuccess("A new Parent is added in the system")
                    window.setTimeout(function () {
                        refreshData();
                    }, ALERT_EXPIRATION_PERIOD);
                }).catch(e => console.log(e)).finally(() => { setLoading(false) })
        } else {
            userService.delete(confirm_parent.item.user.id)
                .then(user => {
                    alertFailer("A registration rejection is successful")
                    window.setTimeout(function () {
                        refreshData();
                    }, ALERT_EXPIRATION_PERIOD);
                }).catch(e => console.log(e)).finally(() => { setLoading(false) })
        }

    }

    const showDeliverConfirm = (parent, status) => {
        setConfirmParent({ item: parent, status: status });
        $(function () {
            $('#confirmationModal').modal('show');
        })
    }
    return (
        <React.Fragment>
            <table className={'table border rounded ' + styles.table} style={{ fontSize: '0.8em' }}>
                <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>FIRST NAME</th>
                        <th scope="col" className={styles.th}>LAST NAME</th>
                        <th scope="col" className={styles.th}>EMAIL</th>
                        <th scope="col" className={styles.th}>RegisteredAt</th>
                        <th scope="col" className={styles.th}>Action</th>
                        <th scope="col" className={styles.th}>Confirm</th>
                        <th scope="col" className={styles.th}>Reject</th>

                    </tr>
                </thead>

                <tbody>
                    {parents && parents.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <th scope="row" className={styles.td}><span className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{item.user.firstName}</td>
                                <td className={styles.td}>{item.user.lastName}</td>
                                <td className={styles.td}>{item.user.email}</td>
                                <td className={styles.td}>{dateFormat(item.createdAt).onlyDate()}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={item} allowed={["READ_MORE"]} /></td>
                                <td className={styles.td}>
                                    <button className="btn btn-info btn-sm" onClick={() => showDeliverConfirm(item, true)}>CONFIRM
                                    </button>
                                </td>
                                <td className={styles.td}>
                                    <button className="btn btn-danger btn-sm" onClick={() => showDeliverConfirm(item, false)}>REJECT
                                    </button>
                                </td>
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
            <ConfirmationModal continueAction={handleConfirmation} loading={loading} setLoading={setLoading}
                message={confirm_parent.status ? "Are You sure the parent belongs to the school ?" : "All data will be forgotten"} btnColor={confirm_parent.status ? "btn-success" : "btn-danger"} />

        </React.Fragment>
    );
}



const ParentsTable = () => {

    const confirmStatus = false;
    const [parents, setParents] = useState([]);
    const [searchParents, setSearchparents] = useState([]);
    const [total, setTotal] = useState(0);
    const [paginator, setPaginator] = useState({ page: 0, perPage: 5, total: 0, range: 5 });
    const [isSearch, setIsSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('');

    let all = [];

    const getParents = (page) => {
        parentService.getAllByConfirmStatusPaginated(confirmStatus, page).then((res) => {
            setParents(res.data.docs);
            setSearchparents(res.data.docs);
            setTotal(res.data.totalItems);
            setPaginator({ ...paginator, total: res.data.totalItems, page: res.data.page });
        }).catch(e => console.log(e))
    }

    const getSearchparents = (val, page) => {
        parentservice.searchByConfirmStatusPaginated(confirmStatus, val, page).then((res) => {
            setSearchparents(res.data.docs);
            setPaginator({ ...paginator, total: res.data.totalItems, page: res.data.page });
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

    // const getFilterKey = (key) => {
    //     setSearchparents(filterData(parents, 'isLocked', key));
    // }

    const refreshData = () => {
        getParents(paginator.page);
    }

    const user = useSelector(state => state.authUser);

    return (

        user.category == system_users.ADMIN ?
            <SingleSubModuleLayoutAdmin
                Content={<Table parents={searchParents} refreshData={refreshData}
                    setParents={setSearchparents} paginator={paginator} setPaginator={setPaginator} />}
                count={total}
                route={"/shared/parents"}
                showFilter={false}
                setSearch={getSearchKey}
                // setFilter={getFilterKey}
                name={"New Registrations"}
                status="new"
                hideAction={true}
            /> :
            <SingleSubModuleLayoutEmployee
                Content={<Table parents={searchParents} refreshData={refreshData}
                    setParents={setSearchparents} paginator={paginator} setPaginator={setPaginator} />}
                count={total}
                route={"/shared/parents"}
                showFilter={false}
                setSearch={getSearchKey}
                name={"New Registrations"}
                status="new"
                hideAction={true}
            />


    );
};


export default ParentsTable;