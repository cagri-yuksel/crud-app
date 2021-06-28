const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
	{
		ownerId: { type: String, required: true},
        post:{type: String, require:true},
		title: {type: String, require:true},
	},
	{ collection: 'posts' }
)

const model = mongoose.model('PostSchema', PostSchema)

module.exports = model
