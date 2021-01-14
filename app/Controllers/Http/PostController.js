'use strict'

const { post } = require("@adonisjs/framework/src/Route/Manager");

// Bring in Model

const Post = use('App/Models/Post')
const AuthorizationService = use('App/Services/AuthorizationService')


class PostController {
    async index({ view }) {
        // const posts = [
        //     {title:'Post one',body:'this is post one'},
        //     {title:'Post two',body:'this is post two'},
        //     {title:'Post three',body:'this is post three'}
        // ]
        const posts = await Post.all();
        return view.render('posts.index', {
            title: 'Latest Posts',
            //posts:posts
            posts:posts.toJSON()
        })
    }
    async get_user_post({ auth }){
        const user = await auth.getUser();  
        console.log(user.id);
        return await user.post().fetch();
    }
    async create({auth,request}){
        const user = await auth.getUser();
        const {title,body} = request.all();
        console.log(title,body);
        const project = new Post();
        project.fill({
            title,
            body,
        })
        await user.post().save(project);
        return project;
        }
    async destroy({ auth, params}){
        const user = await auth.getUser();
        const {id} = params;
        const PostNeedToDelete = await Post.find(id);
        AuthorizationService.verifyPermission(PostNeedToDelete,user);
        await PostNeedToDelete.delete();
        return PostNeedToDelete;
    }
    async update({auth,request, params}){
        const user = await auth.getUser();
        const {id} = params;
        const PostNeedUpdate = await Post.find(id);
        AuthorizationService.verifyPermission(PostNeedUpdate,user);
        PostNeedUpdate.merge(request.all());
        await PostNeedUpdate.save();
        return PostNeedUpdate; 
    }

}

module.exports = PostController
