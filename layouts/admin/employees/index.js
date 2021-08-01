import React from 'react';
import { useEffect, useState } from 'react';
import styles from "../../../styles/components/table.module.css";
import ActionButtons from "../../../components/shared/ActionButtons";
import SingleSubModuleLayout from "../../../layouts/admin-layouts/SingleSubModule";
import { dateFormat, filterData, getFormattedDate, sortData } from "../../../utils/functions";
import EmployeesService from "../../../services/users/school-employee-service"
import { Th } from "../../../components/shared/table/TableHead";
import Pagination from "react-js-pagination";
import ModalProfileDetails from '../../../components/shared/app-user-deatils';
import $ from "jquery";
import { show_modal } from "../../../utils/modal-funs";


const Table = ({ employees, setEmployees, paginator, setPaginator }) => {
    const [ item, setItem ] = useState(null);
    const [ fields, setFields ] = useState(null)
    
    const handleSetItem = (item, status) => {
        setItem(item);
        show_modal('#profileModalDetails')
    }
    
    const handlePageChange = (page) => {
        setPaginator({ ...paginator, ['page']: page });
    };
    
    const [ alert, setAlert ] = useState({ message: "", class: "", show: false })
    
    
    const sortBy = (prop, order) => {
        setEmployees(sortData(employees, prop, order));
    }
    
    
    return (
        <React.Fragment>
            <table className={'table border rounded ' + styles.table} style={{ fontSize: '0.8em' }}>
                <thead>
                    <tr>
                        <th scope="col" className={styles.th}>#</th>
                        <th scope="col" className={styles.th}>Full Names</th>
                        <th scope="col" className={styles.th}>Mobile</th>
                        <th scope="col" className={styles.th}>Gender</th>
                        <th scope="col" className={styles.th}>Residence</th>
                        <th scope="col" className={styles.th}>Status</th>
                        <Th name={'Created On'} prop={'createdAt'} sorter={sortBy}/>
                        <th scope="col" className={styles.th}>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {employees && employees.map((employee, index) => {
                        return (
                            <tr key={employee._id}>
                                <th scope="row" className={styles.td}><span
                                    className="text-uppercase">{index + 1}</span></th>
                                <td className={styles.td}>{employee.user.firstName + ' ' + employee.user.lastName}</td>
                                <td className={styles.td}>{employee.user.phone || 'N/A'}</td>
                                <td className={styles.td}>{employee.user.gender || 'N/A'}</td>
                                <td className={styles.td}>{employee.residence || 'N/A'}</td>
                                {/* <td className={styles.td}>{employee.user.category}</td> */}
                                <td className={styles.td}>
                                        <span
                                            className={!employee.user.isLocked ? styles.active : styles.inactive}>
                                            {employee.status}
                                        </span>
                                </td>
                                <td className={styles.td}>{dateFormat(employee.createdAt).onlyDate()}</td>
                                <td className={styles.td}><ActionButtons handleSetItem={handleSetItem} item={employee}
                                            allowed={[ "READ_MORE" ]}/></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            
            <div className={"row justify-content-end mt-4 mb-4"}>
                <Pagination activePage={paginator.page} itemsCountPerPage={paginator.perPage}
                            totalItemsCount={paginator.total} pageRangeDisplayed={paginator.range}
                            onChange={handlePageChange}/>
            </div>
            {item && <ModalProfileDetails item={item} category={"SCHOOL_EMPLOYEE"}/>}
        </React.Fragment>
    );
}


const EmployeesTable = () => {
    
    const [ employees, setEmployees ] = useState([]);
    const [ searchEmployees, setSearchEmployees ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ paginator, setPaginator ] = useState({ page: 1, perPage: 5, total: 0, range: 5 });
    const [ isSearch, setIsSearch ] = useState(false);
    const [ searchKey, setSearchKey ] = useState('');
    
    let all = [];
    
    const getEmployees = (page) => {
        EmployeesService.getPaginated(page)
        .then((res) => {
            setEmployees(res.data);
            setSearchEmployees(res.data);
        })
        .catch((e) => console.error(e));
        // EmployeesService.getPaginated(page)
        //     .then((res) => {
        //         setEmployees(res.data.docs);
        //         setSearchEmployees(res.data.docs);
        //         setTotal(res.data.totalDocs);
        //         setPaginator({
        //             ...paginator,
        //             total: res.data.totalDocs,
        //             page: res.data.page,
        //         });
        //     })
        //     .catch((e) => console.error(e));
    }
    const getSearchEmployees = (val, page) => {
        // EmployeesService.searchPaginated(val, page).then((res) => {
        //     setSearchEmployees(res.data.docs);
        //     setPaginator({ ...paginator, total: res.data.totalDocs, page: res.data.page });
        // })
    }
    useEffect(() => {
        getEmployees(paginator.page);
        // if (!isSearch)
        //     getEmployees(paginator.page);
        // else getSearchEmployees(searchKey, paginator.page);
    }, [ paginator.page ]);
    
    const getSearchKey = (val) => {
        setSearchKey(val);
        if (val === '' || val === ' ' || !val.replace(/\s/g, '').length) {
            setSearchEmployees(employees);
            setIsSearch(false);
        } else {
            getSearchEmployees(val, paginator.page);
            setIsSearch(true);
        }
    };
    
    const getFilterKey = (key) => {
        setSearchEmployees(filterData(employees, 'status', key));
    }
    
    
    return (
        <SingleSubModuleLayout
            Content={<Table employees={searchEmployees} setEmployees={setSearchEmployees} paginator={paginator}
                            setPaginator={setPaginator}/>}
            count={total}
            route={"/admin/employees"}
            showFilter={true}
            setSearch={getSearchKey}
            setFilter={getFilterKey}
            name={"Employees"}
            status="new"
        />
    );
};


export default EmployeesTable;