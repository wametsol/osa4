const usersRouter = require('express').Router()
const User = require('../models/user')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
usersRouter.use(bodyParser.json())


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})
usersRouter.post('/', async (request, response) => {
    try {
        
        const body = request.body
        
        const existingUser = await User.find({username: body.username})
        if(existingUser.length>0){
            return response.status(400).json({ error: 'username must be unique'})
        }
        if(body.password.length<3){
            console.log('LIIAN LYHYT');
           return response.status(400).json({ error: 'password too short!'})
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult === undefined ? true : body.adult,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(savedUser)
        
    } catch (exception) {
        console.log(exception);
        response.status(500).json({ error: 'something went wrong'})
        
    }
})


module.exports = usersRouter