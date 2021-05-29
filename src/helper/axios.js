import axios from "axios"; 
import config from "../config";
import constants from '../helper/constants'

//create axios
export async function api() {
    let opts = {
        baseURL: config.employeeServer.trim()
    };
    return axios.create(opts);
}

//api catch
export async function catchHandler(e) { 
    let res =  e.response  && e.response.data ? e.response.data : {message: constants.serverError} ;
    throw res
}
