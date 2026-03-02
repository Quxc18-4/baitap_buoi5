const User = require('../schemas/users');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (error) {  
        res.status(400).send({
            message: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false }).populate('role');
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }  
}

const getUserByID = async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.params.id, isDeleted: false }).populate('role');
        if(user){
            res.status(200).send(user);
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

const updateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, req.body, { new: true }).populate('role');
        if (user) {
            res.status(200).send(user);
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

const softDeleteUser = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate({ _id: req.params.id, isDeleted: false }, { isDeleted: true }, { new: true });
        if(user){
            res.status(200).send(user);
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

module.exports = { createUser, getAllUsers, getUserByID, updateUser, softDeleteUser };