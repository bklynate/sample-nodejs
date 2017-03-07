/*
 * Common mesage body
*/
exports.str = function (results, msg, details) {
    return resBody = {
        results: results,
        status: msg,
        details: details
    };
};