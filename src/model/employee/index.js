import {showAlert} from '../../helper';
import {getEmployeesFromAPI} from '../../service/employee';
import {database} from '../../service/employee/db/database';
const employee = database.collections.get('employee');
import {Q} from '@nozbe/watermelondb';

export default {
  state: {
    loading: false,
    error: null,
    employees: [],
    employee: {},
  },

  reducers: {
    //on request
    onRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    getEmployee(state, data) {
      return {
        ...state,
        employee: data,
      };
    },

    //on emplyee api success
    onGetEmployees(state, data) {
      return {
        ...state,
        loading: false,
        employees: data || [],
      };
    },

    //on error
    onError(state, error) {
      if (error) {
        showAlert(error);
      }
      return {
        ...state,
        loading: false,
        error: error,
      };
    },
  },

  effects: {
    //get employee list
    async getEmployees() {
      this.onRequest();
      try {
        let data = await employee.query().fetch();
        let result = data.map(v => {
          return {
            ...v._raw,
            address: JSON.parse(v._raw.address),
            company: JSON.parse(v._raw.company),
          };
        });
        if (result && result.length > 0) {
          this.onGetEmployees(result);
        } else {
          try {
            const res = await getEmployeesFromAPI();
            if (res && res.length > 0) {
              this.insertEmployeeIntoTable(res);
              this.onGetEmployees(res);
            }
          } catch (e) {
            this.onError(e && e.message ? e.message : null);
          }
        }
      } catch (e) {
        this.onError(e && e.message ? e.message : null);
      }
    },

    //insert employee table
    async insertEmployeeIntoTable(empList) {
      empList.forEach(async v => {
        await database.action(async () => {
          await employee.create(entry => {
            entry.eid = v.id;
            entry.name = v.name;
            entry.username = v.username;
            entry.profile_image = v.profile_image;
            entry.email = v.email;
            entry.address = JSON.stringify(v.address);
            entry.phone = v.phone;
            entry.website = v.website;
            entry.company = JSON.stringify(v.company);
          });
        });
      });
    },

    //search emplyees
    async searchEmployees(payload) {
      try {
        let data = await employee
          .query(
            Q.or(
              Q.where('name', Q.like(`%${Q.sanitizeLikeString(payload)}%`)),
              Q.where('email', Q.like(`%${Q.sanitizeLikeString(payload)}%`)),
            ),
          )
          .fetch();
        let result = data.map(v => {
          return {
            ...v._raw,
            address: JSON.parse(v._raw.address),
            company: JSON.parse(v._raw.company),
          };
        });
        if (result && result.length > 0) {
          this.onGetEmployees(result);
        } else {
          this.onGetEmployees([]);
        }
      } catch (e) {
        this.onError(e && e.message ? e.message : null);
      }
    },
  },
};
