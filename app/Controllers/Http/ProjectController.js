'use strict'

const Project = use('App/Models/Project')
const AuthService = use('App/Services/AuthService')

class ProjectController {
    /**
     * Display a listing of the resource.
     *
     * @param {*} request
     * @memberof ProjectController
     */
    async index({ auth }) {
        const user = await auth.getUser()

        return await user.projects().fetch()
    }

    /**
     * Display the specified resource.
     *
     * @param {*} { auth, params }
     * @returns
     * @memberof ProjectController
     */
    async show({ auth, params }) {
        const user = await auth.getUser()
        const { id } = params
        const project = await Project.find(id)
        AuthService.Permission(project, user)

        return project
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param {*} { auth, request }
     * @memberof ProjectController
     */
    async create({ auth, request }) {
        const user = await auth.getUser()
        const { name } = request.all()
        const project = new Project();
        project.fill({
            name
        })
        await user.projects().save(project)

        return project
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param {*} { auth, params }
     * @memberof ProjectController
     */
    async destroy({ auth, params }) {
        const user = await auth.getUser()
        const { id } = params
        const project = await Project.find(id)
        AuthService.Permission(project, user)
        await project.delete()

        return {
            success: "The Project with ID: " + id + " has been deleted"
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param {*} { auth, params, request }
     * @returns
     * @memberof ProjectController
     */
    async update({ auth, params, request }) {
        const user = await auth.getUser()
        const { id } = params
        const project = await Project.find(id)
        AuthService.Permission(project, user)
        project.merge(request.only('name'))
        await project.save()

        return project
    }

}

module.exports = ProjectController
