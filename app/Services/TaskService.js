const ResourceNotFoundException = use('App/Exceptions/ResourceNotFoundException')

class TaskService {
    CheckResource(resource) {
        if (!resource) {
            throw new ResourceNotFoundException()
        }
    }
}

module.exports = new TaskService