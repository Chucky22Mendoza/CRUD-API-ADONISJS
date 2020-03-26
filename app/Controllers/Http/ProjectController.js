'use strict'

const Project = use('App/Models/Project')

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
     * @param {*} { auth, request, params }
     * @memberof ProjectController
     */
    async destroy({ auth, response, params }) {
        const user = await auth.getUser()
        const { id } = params
        const project = await Project.find(id)
        if (project.user_id !== user.id) {
            return response.status(403).json({
                message: "You not authorized for do this action"
            })
        }
        await project.delete()
        return {
            message: "The project with ID " + id + " has been deleted"
        }
    }

}

module.exports = ProjectController
