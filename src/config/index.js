//Server
const server = {
    employee: "http://www.mocky.io/",
}

//Api version
const version = "v2"

//Environment
const env = {
    development: {
        employeeServer: `${server.employee}${version}`,
    }
}

//Api
const api = {
    employee: {
        list: '/5d565297300000680030a986'
    },
}

export default {
    ...env['development'],
    ...api
}

