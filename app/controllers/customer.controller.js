const Customer = require("../models/customer.model.js");

const Login = require("../models/login.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content Cannot be empty !"
        })
    }
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active,
        password : req.body.password,
        role : req.body.role
    })

    Customer.create(customer, (err, data) => {
        if (err) {
            res.status(500).send({
                message: "some error occured while creating a new customer"
            })
        }
        else res.send(data);
    })
}

exports.AuthUser = (req, res) => {

    // Validate request
    
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      Login.AuthUser(req.body.username,req.body.password, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Customer with id " + req.params.customerId
            });
          }
        } else
        {
            let dataDemo  ={
               name : data[0].name,
               email : data[0].email,
               role : data[0].role,
               isLoggedIn : data.success,
               active : data[0].active,
               message : data.success
            }
            res.send(dataDemo);
        } 
      });
    
}

exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.updateById(
        req.params.customerId,
        new Customer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.customerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.customerId
                    });
                }
            } else res.send(data);
        }
    );
};


exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.customerId
                });
            }
        } else res.send({ message: `Customer was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
    Customer.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all customers."
            });
        else res.send({ message: `All Customers were deleted successfully!` });
    });
};

