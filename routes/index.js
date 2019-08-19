module.exports =
    /**
     * 
     * @param {*} router router sur lequel sera greffe les routes definies
     */
    function (router) {
        require('./OrderStatusRoutes')(router);
        console.log("API Router started.");
    }