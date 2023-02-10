const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

// get thoughts
router.route('/')
    .get(getAllThoughts);

// get thought
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// create thought
router.route('/:userId')
    .post(createThought);

//react
router.route('/:thoughtId/reactions')
    .post(addReaction);

// delete reaction
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;