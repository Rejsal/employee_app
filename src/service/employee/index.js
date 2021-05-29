import SQLite from 'react-native-sqlite-storage'
import config from '../../config';
import { api, catchHandler } from '../../helper/axios';
SQLite.DEBUG(false);
SQLite.enablePromise(true);

//database
const database = "employee.db"

//create local table
export async function createEmployeeTable() {
    try {
        let db = await SQLite.openDatabase({ name: database, location: 'default' })
        return await db.executeSql(
            "CREATE TABLE IF NOT EXISTS employee ( id int PRIMARY KEY , name TEXT, username TEXT, profile_image TEXT, email TEXT, address TEXT, phone TEXT, website TEXT, company TEXT );"
        );
    } catch (e) {
        throw e
    }
}

//insert employee data to employee table
export async function insertEmployeeTable(data) {
    console.log(data);
    try {
        let db = await SQLite.openDatabase({ name: database, location: 'default' })
        return await db.executeSql(
            "INSERT OR REPLACE INTO employee ( id, name, username, profile_image, email, address, phone, website, company ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ? );", [data.id, data.name, data.username, data.profile_image, data.email, JSON.stringify(data.address), data.phone, data.website, JSON.stringify(data.company)]
        );
    } catch (e) {
        throw e
    }
}

//get employees from employee table
export async function getEmployeesFromTable(resultCB) {
    try {
        let db = await SQLite.openDatabase({ name: database, location: 'default' })
        let results = await db.executeSql(
            "SELECT * FROM employee;"
        );
        let data = []
        if (results && results.length > 0 && results[0].rows) {
            const len = results[0].rows.length
            for (let i = 0; i < len; i++) {
                let item = results[0].rows.item(i);
                if(item.company) {
                    item.company = JSON.parse(item.company)
                }
                if(item.address) {
                    item.address = JSON.parse(item.address)
                }
                data.push(item)
            }
        }
        resultCB(data)
    } catch (e) {
        throw e
    }
}

//search employees from employee table
export async function searchEmployeesFromTable(payload, resultCB) {
    try {
        let db = await SQLite.openDatabase({ name: database, location: 'default' })
        let results = await db.executeSql(
            "SELECT * FROM employee WHERE name LIKE ? OR email LIKE ?;", [`%${payload}%`, `%${payload}%`]
        );
        let data = []
        if (results && results.length > 0 && results[0].rows) {
            const len = results[0].rows.length
            for (let i = 0; i < len; i++) {
                let item = results[0].rows.item(i);
                if(item.company) {
                    item.company = JSON.parse(item.company)
                }
                if(item.address) {
                    item.address = JSON.parse(item.address)
                }
                data.push(item)
            }
        }
        resultCB(data)
    } catch (e) {
        throw e
    }
}

//get employees from API
export async function getEmployeesFromAPI() {
    return (await api())
    .get(config.employee.list)
    .then(res => res.data)
    .catch(catchHandler);
}