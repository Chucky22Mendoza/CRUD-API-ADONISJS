'use strict'

const Project = use('App/Models/Project')

class ProjectController {
    /**
     * Display a listing of the resource.
     *
     * @param {*} request
     * @param {*} response
     * @memberof ProjectController
     */
    async index({ auth }) {
        const user = await auth.getUser()
        return await user.projects().fetch()
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

}

module.exports = ProjectController
