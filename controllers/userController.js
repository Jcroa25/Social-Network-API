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
    addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No friends' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },

    //Delete Friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $pull: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No friend found :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    };

module.exports = userController;