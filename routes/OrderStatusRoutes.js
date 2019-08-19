var express = require('express');
var router = express.Router();
var OrderStatusController = require('../controllers/OrderStatusController.js');


module.exports =
    function (router) {
        /*
         * GET
         */
        router.get('/orderStatus/', OrderStatusController.list);

        /*
         * GET
         */
        router.get('/orderStatus/:id', OrderStatusController.show);

        /*
         * POST
         */
        router.post('/orderStatus/', OrderStatusController.create);

        /*
         * PUT
         */
        router.put('/orderStatus/:id', OrderStatusController.update);

        /*
         * DELETE
         */
        router.delete('/orderStatus/:id', OrderStatusController.remove);

    }
