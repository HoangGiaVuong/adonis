'use strict'

const User = use('App/Models/User');
const Database = use('Database');


class UserController {
    async register( {request}){
        const {email, password} = request.all();
        console.log(email,password);
        await User.create({
            email,
            password,
            username : email,
        });
        return this.login(...arguments);
    }
    async login({request, auth}){
        const{ email,password } = request.all();
        const token = await auth.attempt(email,password);
        return token;
    }
    async get_user(request,response){
        const users = await Database.select('*').from('users').whereNotNull('created_at');
        console.log(users);
        return users;   
    }
    async insert_user({request,response}){
        const {email, password} = request.all();
        console.log(request);
        console.log(email,password);
        const userID = await Database.insert({username: email, email: email,password:password}).into('users');
        console.log(email,password);
        
    }
  
}


module.exports = UserController
