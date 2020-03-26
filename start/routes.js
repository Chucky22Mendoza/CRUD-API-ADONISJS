'use strict'

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
  return { message: 'Welcome to AdonisJS API' }
})

Route.group(() => {
  // Routes of Users
  Route.post('/register', 'UserController.store')
  Route.post('/login', 'UserController.login')
}).prefix('api/v1/users')

Route.group(() => {
  // Routes of Projects
  Route.get('/', 'ProjectController.index')
  Route.get('/:id', 'ProjectController.show')
  Route.post('/', 'ProjectController.create')
  Route.patch('/:id', 'ProjectController.update')
  Route.delete('/:id', 'ProjectController.destroy')

  //Routes of Tasks
  Route.get('/:id/tasks', 'TaskController.index')
  Route.post('/:id/tasks', 'TaskController.create')
}).prefix('api/v1/projects').middleware('auth')

Route.group(() => {
  //Routes of Tasks
  Route.get('/:id', 'TaskController.show')
  Route.patch('/:id', 'TaskController.update')
  Route.delete('/:id', 'TaskController.destroy')
}).prefix('api/v1/tasks').middleware('auth')