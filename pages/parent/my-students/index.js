import React from 'react';
import { useEffect, useState } from 'react';
import ParentService from "../../../services/users/parent-service"
// import { Th } from "../../../components/shared/table/TableHead";
import SingleSubModule from '../../../layouts/parent/SingleSubModule';
import { useSelector } from 'react-redux';
import StudentTable from '../../../components/shared/parents/students-table';
import ParentDashboard from '../../../components/dashboards/ParentDashboard';

const Table = ({students}) => {

    return (
        <React.Fragment>
            <StudentTable students={students}/>
        </React.Fragment>
    );
}



const ParentsTable = () => {

    const [students, setStudents] = useState([]);
    const user = useSelector(state => state.authUser);

    useEffect(() => {
        ParentService.getByUser(user.id)
        .then((res)=>{
            setStudents(res.data.students)
        }).catch(error => {
            console.log(error)})
    }, []);



    return (
            <SingleSubModule
            Content={<Table students={students}/>}
            count={students.length}
            route={"/parent/my-students"}
            parents={"My Students"}
            status="new"
            />
                 
    );
};

export default ParentsTable;