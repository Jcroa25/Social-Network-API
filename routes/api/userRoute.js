const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');
//users
router.route('/')
    .get(getAllUsers)
    .post(createUser);
//users id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
// add/delete friend
router.route('/:id/friends/:friendid')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;