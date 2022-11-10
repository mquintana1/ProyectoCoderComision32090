const moment = require ('moment')

const hoy = moment()

const nacimiento = moment("18/06/1994","DD/MM/YYYY")

const difYear = hoy.diff(nacimiento, 'years')
const difDays = hoy.diff(nacimiento, 'days')

console.log(`Hoy es ${hoy.format("DD/MM/YYYY")}`)
console.log(`Naci el ${nacimiento.format("DD/MM/YYYY")}`)
console.log(`Desde mi nacimiento ${nacimiento.format("DD/MM/YYYY")}, han pasado ${difYear} años y ${difDays} de dias`)