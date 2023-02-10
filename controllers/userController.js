const { User } = require('../models');
const userController = {

    //Get users
    getAllUsers(req, res) {
        User.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },

    //Get user
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v') 
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found'});
                return; 
            }
            res.json(dbUsersData)
        })
        .catch(error => {
            console.log(error);
            res.status(400).json(error)
        })
    },

    //Create User
    createUser({ body }, res) {
        User.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(error => res.status(400).json(error));
    },

    //Update user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id} , body, { new: true, runValidators: true })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(error => res.json(error))
    },

    //Delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({ message: 'No user found'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(error => res.status(400).json(error));
    },

    //Add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId }}, { new: true })
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({ message: 'No user found'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(error => res.json(error));
    },

    //Delete Friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id }, { pull: { friends: params.friendId }}, { new: true })
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(error => res.status(400).json(error));
    }
}

module.exports = userController;