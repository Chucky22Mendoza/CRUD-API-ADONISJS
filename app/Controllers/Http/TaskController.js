'use strict'

const Project = use('App/Models/Project')
const Task = use('App/Models/Task')
const AuthService = use('App/Services/AuthService')
const TaskService = use('App/Services/TaskService')

class TaskController {

    /**
     * Display a listing of the resource.
     *
     * @param {*} { auth, params }
     * @memberof TaskController
     */
    async index({ auth, params }) {
        const user = await auth.getUser()
        const { id } = params
        const project = await Project.find(id)
        AuthService.Permission(project, user)

        return await project.tasks().fetch()
    }

    /**
     * Display the specified resource.
     *
     * @param {*} { auth, params }
     * @returns
     * @memberof TaskController
     */
    async show({ auth, params }) {
        const user = await auth.getUser()
        const { id } = params
        const task = await Task.find(id)
        TaskService.CheckResource(task)
        const project = await task.project().fetch()
        AuthService.Permission(project, user)

        return task
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param {*} { auth, request, params }
     * @returns
     * @memberof TaskController
     */
    async create({ auth, request, params }) {
        const user = await auth.getUser()
        const { title, description } = request.all()
        const { id } = params
        const project = await Project.find(id)
        AuthService.Permission(project, user)
        const task = new Task();
        task.fill({
            title,
            description
        })
        await project.tasks().save(task)

        return task
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param {*} { auth, params }
     * @memberof TaskController
     */
    async destroy({ auth, params }) {
        const user = await auth.getUser()
        const { id } = params
        const task = await Task.find(id)
        TaskService.CheckResource(task)
        const project = await task.project().fetch()
        AuthService.Permission(project, user)
        await task.delete()

        return {
            success: "The Task with ID: " + id + " has been deleted"
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param {*} { auth, params, request }
     * @returns
     * @memberof TaskController
     */
    async update({ auth, params, request }) {
        const user = await auth.getUser()
        const { id } = params
        const task = await Task.find(id)
        TaskService.CheckResource(task)
        const project = await task.project().fetch()
        AuthService.Permission(project, user)
        task.merge(request.only([
            'title',
            'description',
            'done'
        ]))
        await task.save()

        return task
    }

}

module.exports = TaskController
