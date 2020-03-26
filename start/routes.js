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
  Route.post('/register', 'UserController.store')
  Route.post('/login', 'UserController.login')
}).prefix('api/v1/users')

Route.group(() => {
  Route.get('/', 'ProjectController.index')
  Route.post('/', 'ProjectController.create')
  Route.get('/:id', 'ProjectController.show')
  Route.delete('/:id', 'ProjectController.destroy')
  Route.patch('/:id', 'ProjectController.update')
}).prefix('api/v1/projects').middleware('auth')