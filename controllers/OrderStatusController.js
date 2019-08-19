var OrderStatusModel = require('../models/OrderStatusModel.js');

/**
 * OrderStatusController.js
 *
 * @description :: Server-side logic for managing OrderStatuss.
 */
module.exports = {

    /**
     * OrderStatusController.list()
     */
    list: function (req, res) {
        OrderStatusModel.find(function (err, OrderStatuss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OrderStatus.',
                    error: err
                });
            }
            return res.json(OrderStatuss);
        });
    },

    /**
     * OrderStatusController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        OrderStatusModel.findOne({ _id: id }, function (err, OrderStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OrderStatus.',
                    error: err
                });
            }
            if (!OrderStatus) {
                return res.status(404).json({
                    message: 'No such OrderStatus'
                });
            }
            return res.json(OrderStatus);
        });
    },

    /**
     * OrderStatusController.create()
     */
    create: function (req, res) {
        var OrderStatus = new OrderStatusModel({
            OrderStatus: req.body.OrderStatus,
            orderCancelled: req.body.orderCancelled

        });

        OrderStatus.save(function (err, OrderStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating OrderStatus',
                    error: err
                });
            }
            return res.status(201).json(OrderStatus);
        });
    },

    /**
     * OrderStatusController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        OrderStatusModel.findOne({ _id: id }, function (err, OrderStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting OrderStatus',
                    error: err
                });
            }
            if (!OrderStatus) {
                return res.status(404).json({
                    message: 'No such OrderStatus'
                });
            }

            OrderStatus.OrderStatus = req.body.OrderStatus ? req.body.OrderStatus : OrderStatus.OrderStatus;
            OrderStatus.orderCancelled = req.body.orderCancelled ? req.body.orderCancelled : OrderStatus.orderCancelled;

            OrderStatus.save(function (err, OrderStatus) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating OrderStatus.',
                        error: err
                    });
                }

                return res.json(OrderStatus);
            });
        });
    },

    /**
     * OrderStatusController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        OrderStatusModel.findByIdAndRemove(id, function (err, OrderStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the OrderStatus.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }

};
