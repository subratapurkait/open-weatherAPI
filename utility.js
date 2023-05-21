const moment = require('moment'); // require

const unixToIndiaTZ = (params) => {
    return moment.unix(params).utcOffset("+05:30"); //india timezone
}
module.exports = {
    unixToIndiaTZ
}