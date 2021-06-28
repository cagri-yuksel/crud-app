const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const User = require('./model/user')
const posts = require('./model/post')

const JWT_SECRET = 'ZeWm-kP7xF6JMHOpbhDNQPsE49xf5vgLYcHg1fChyOg'

mongoose.connect('mongodb://localhost:27017/crud-app-db', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})

const app = express()
app.use(express.json())
app.use(cors())

app.post("/api/login", async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username }).lean()

	if (!user) {
		return res.status(401).send('Invalid username/password')
	}
	try {
		bcrypt.compare(password, user.password, (err, result) => {
			if(!result){
				return res.status(401).send('Invalid username/password')
			}
			if (result) {
			
				jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, (err,token)=>{
				 if(token){
		
					res.status(200).send({ token, username })
				 }	
				 if(err){
			
					res.status(400).send(err)
				 }
				})
				
			} if(err){
	
				res.status(400).send(err)
		
			}
		})
	} 
	catch (error) {

		res.status(400).send("error")
	}
}) 



app.post('/api/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body


	if (!username || typeof username !== 'string') {
		return res.send({ status: 406, error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.send({ status: 406, error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.send({ status: 406, error: 'Password too small. Should be atleast 6 characters' })
	}

	const password = await bcrypt.hash(plainTextPassword, 10)
	try {
		const response = await User.create({
			username,
			password
		})
	
		res.status(201)
	} catch (error) {
		if (error.code === 11000) {

			return res.status(409).send("This User Already In Use ")
		}

	}
	res.status(201)

})



app.post('/api/addPost', async (req, res) => {
	const token = req.body.headers.authorization
	const { post, title } = req.body
	const user = jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return err
		} else {
			return decoded
		}
	})
	const _id = user.id
	try {
		posts.create({
			title: title,
			ownerId: _id,
			post: post

		}, (err, docs) => {
			if (docs) res.status(201).send(docs)
			if (err) res.status(401).send(err)
		})
	} catch (e) {

		res.status(400).send(e)

	}


})

app.get("/api/posts", (req, res) => {
	const token = req.headers.authorization
	const user = jwt.verify(token, JWT_SECRET)
	const _id = user.id

	posts.find({ ownerId: _id })

		.then(posts => {
			res.json(posts)
		}).catch(err => {
			res.status(401).send(err)

		});
})

app.delete("/api/deletePost", async (req, res) => {
	const id_ = req.query._id
	const token = req.headers.authorization
	const user = jwt.verify(token, JWT_SECRET)
	const _id = user.id

	const docsCheck = await posts.find({ _id: id_, ownerId: _id }, (err, docs) => {
		return docs
	})
	try {

		posts.findOneAndRemove({ _id: docsCheck[0]._id }, (err, docs) => {
		})

		res.status(200).send("Deleted")
	}
	catch (e) {

		res.status(400).send(e)

	}
})
app.put("/api/updatePost", async (req, res) => {
	const { item } = req.body
	const token = req.body.headers.authorization
	const user = jwt.verify(token, JWT_SECRET)
	const _id = user.id
	const replacement = item


	const docsCheck = await posts.find({ _id: item._id, ownerId: _id }, (err, docs) => {


	})
	try {
		posts.findByIdAndUpdate({ _id: docsCheck[0]._id }, replacement, (err, docs) => {
		})
		res.status(200).send(replacement)
	}
	catch (e) {

		res.status(400).send(e)
	}
})

app.listen(9999, () => {
	console.log('Server up at 9999')
})
