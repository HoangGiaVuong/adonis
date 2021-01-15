'use strict'

const Post = use('App/Models/Post');
const Task = use('App/Models/Task');
const AuthorizationService = use('App/Services/AuthorizationService')

class TaskController {

    async index({auth, request, params}){
        const user = await auth.getUser();
        const {id} = params;
        const post = await Post.find(id);
        
        AuthorizationService.verifyPermission(post,user);
        return await post.tasks().fetch();
    }

    async create({auth, request, params}){
        const user = await auth.getUser();
        const {description} = request.all();
        const {id} = params;
        const post = await Post.find(id);
        
        AuthorizationService.verifyPermission(post,user);
        const task = new Task();
        task.fill({
            description,
        });
        await post.tasks().save(task);
        return task;
    }

    async destroy({ auth, params}){
        const user = await auth.getUser();
        const { id } = params;
        const TaskNeedToDelete = await Task.find(id);
        const post = await TaskNeedToDelete.post().fetch();
        AuthorizationService.verifyPermission(post,user);
        await TaskNeedToDelete.delete();
        return TaskNeedToDelete;
    }

    async update({auth,request, params}){   
        const user = await auth.getUser();
        const { id } = params;
        const TaskNeedUpdate = await Task.find(id);
        
        const post = await TaskNeedUpdate.post().fetch();
        AuthorizationService.verifyPermission(post,user);
        TaskNeedUpdate.merge(request.only([
            'description',
            'completed'
        ]));
        await TaskNeedUpdate.save();
        return TaskNeedUpdate; 
    }
    
}

module.exports = TaskController
