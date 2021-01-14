'use strict'

const { RouteResource } = require('@adonisjs/framework/src/Route/Manager')
const PostController = require('../app/Controllers/Http/PostController')
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.get('/posts','PostController.index');
Route.get('/get_user','UserController.get_user');
Route.post('/insert_user','UserController.insert_user');

Route.group(()=>{
  Route.post('auth/register', 'UserController.register');
  Route.post('auth/login', 'UserController.login');
  Route.get('posts/project', 'PostController.get_user_post').middleware('auth');
  Route.post('posts/project', 'PostController.create').middleware('auth');
  Route.delete('posts/project/:id', 'PostController.destroy').middleware('auth');
  Route.patch('posts/project/:id', 'PostController.update').middleware('auth');
})
  .prefix('api');
