import moment from 'moment'
import message from './date-message.js'

console.log(message(moment().format('DD-MM-YYYY HH:mm:ss')))