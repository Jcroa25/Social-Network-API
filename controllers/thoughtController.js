const { Thought, User } = require('../models');
const { getAllUsers } = require('./userController');

const thoughtController = {
    //get thought
    getAllThoughts(req,res) {
        Thought.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    //get thought with ID
    getThoughtById({params}, res) {
        Thought.findOne({ _id: params.id })
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No matching thought'});
                return;
            }
            res.json(dbThoughtsData) 
        })
        .catch(error => {
            console.log(error);
            res.sendSatus(400);
        })
    },
    //new thought
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return getAllUsers.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: _id }}, { new: true});
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'No matching thought'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(error => res.json(error));
    },

    //update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .poulate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No matching thought' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(error => res.json(error));
    },

    //delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No matching thought' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(error => res.status(400).json(error));
    },

    //add Reaction
    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body }}, { new: true, runValidators: true })
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404),json({ message: 'No matching thought' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(error => res.status(400).json(error))
    },

    //delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId }}}, { new : true })
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({ message: 'No matching thought' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(error => res.status(400).json(error));
    }
}

module.exports = thoughtController;