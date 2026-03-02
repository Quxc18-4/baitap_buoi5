const Role = require('../schemas/roles');

const createRole = async (req, res) => {
    try {
        const role = await Role.create(req.body);
        res.status(201).send(role);
    } catch (error) {  
        res.status(400).send({
            message: error.message
        })
    }
}

const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isDeleted: false });
        res.status(200).send(roles);
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }  
}

const getRoleByID = async (req, res) => {
    try{
        const role = await Role.findOne({ _id: req.params.id, isDeleted: false });
        if(role){
            res.status(200).send(role);
        } else {
            res.status(404).send({
                message: "id not found"
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}

const updateRole = async (req, res) => {
    try {
        const role = await Role.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, { new: true });
        if (role) {
            res.status(200).send(role);
        } else {
            res.status(404).send({
                message: "id not found"
            })
        }
    } catch (error) { 
        res.status(400).send({
            message: error.message
        })
    }
}

const softDeleteRole = async (req, res) => {
    try{
        const role = await Role.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if(role){
            res.status(200).send(role);
        } else {
            res.status(404).send({
                message: "id not found"
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}

module.exports = { createRole, getAllRoles, getRoleByID, updateRole, softDeleteRole};