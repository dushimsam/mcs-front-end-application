import moment from "moment";

import SortTables from "./sort-tables";

export const isEmpty = (value) => {
    return (value == null || value.length === 0);
}

export const formatDate = (date) => {
    const DATE = new Date(date);
    const day = ((DATE.getDate() + 1) < 10) ? ('0' + (DATE.getDate() + 1)) : DATE.getDate() + 1
    const month = ((DATE.getMonth() + 1) < 10) ? ('0' + (DATE.getMonth() + 1)) : DATE.getMonth() + 1
    return (DATE)
}

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export const getFormattedDate = (date) => {
    return dateFormat(date).onlyDate()
}

export const toDate = (timestamp) => {
    return (new Date(parseInt(timestamp)))
}

export const splitArray = (array, chunks = 2) => {
    const items = [...array];

    const split = [[], []]

    const per = Math.ceil(items.length / 2)

    for (let i = 0; i < chunks; i++) {
        for (let j = 0; j < per; j++) {
            const value = items[j + i * per]
            if (!value) continue
            split[i].push(value)
        }
    }

    return split;
}

export const sortData = (data, prop, order) => {
    const copy = [...data];

    const structured = copy.map(item => {
        return {
            id: item['_id'],
            value: item[prop]
        };
    });

    return SortTables(structured, copy, order);
}

export const isThisFormValid = (form) => {
    let keys = Object.keys(form)
    for (const key of keys) if (!form[key]) return false
    return true
}


export const updateJavaScriptObject=(details1, details2)=> {
        const outputObject = {};
        Object.keys(details1)
        .forEach(obj => outputObject[obj] =
        (details2.hasOwnProperty(obj) ? details2[obj] : details1[obj]));
        return outputObject;
     }


export const filterData = (array, prop, val) => {
    const arr = [...array];


    if (val === 'ALL') return arr;


    if (val.constructor === Array)
        return arr.filter((item) => {
            return val.includes(item);
        });


    return arr.filter((item) => {
        return item[prop] === val
    });
}

export const dateFormat = (date) => ({
    fromNow(){
        return moment(date).fromNow();
    },

    onlyDate(){
        return moment(date).format("MMM Do YY")
    }
})

export const find_date_difference = (date1,date2) =>{
// To calculate the time difference of two dates
var Difference_In_Time = date2.getTime() - date1.getTime();

// To calculate the no. of days between two dates
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

return[Difference_In_Time,Difference_In_Days]
}



