import { showAlert } from "../../helper";
import { createEmployeeTable, getEmployeesFromAPI, getEmployeesFromTable, insertEmployeeTable } from "../../service/employee";

export default {
    state: {
        loading: false,
        error: null,
        employees: [],
        employee: {}
    },

    reducers: {
        //on request 
        onRequest(state) {
            return {
                ...state,
                loading: true
            };
        },

        getEmployee(state, data) {
            return {
                ...state,
                employee: data
            }
        },

        //on emplyee api success
        onGetEmployees(state, data) {
            return {
                ...state,
                loading: false,
                employees: data || []
            }
        },

        //on error
        onError(state, error) {
            if (error)
                showAlert(error);
            return {
                ...state,
                loading: false,
                error: error
            }
        }
    },

    effects: {
        //get employee list
        async getEmployees() {
            this.onRequest();
            try {
                await createEmployeeTable()
                await getEmployeesFromTable(async result => {
                    if (result && result.length > 0) {
                        this.onGetEmployees(result)
                    } else {
                        try {
                            const res = await getEmployeesFromAPI();
                            if (res && res.length > 0) {
                                this.insertEmployeeIntoTable(res);
                                this.onGetEmployees(res)
                            }
                        } catch (e) {
                            this.onError(e && e.message ? e.message : null)
                        }
                    }
                })
            } catch (e) {
                this.onError(e && e.message ? e.message : null)
            }
        },

        //insert employee table
        async insertEmployeeIntoTable(empList) {
            empList.forEach(v => {
                insertEmployeeTable(v)
            })
        }
    }
};
