'use strict'

const User = use('App/Models/User')

class UserController {

    /**
     * Create a new token from a new user
     *
     * @param {*} { request, auth }
     * @returns
     * @memberof UserController
     */
    async login({ request, auth }) {
        const { email, password } = request.all()
        const token = await auth.attempt(email, password)

        return token
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param {*} {request}
     * @returns
     * @memberof UserController
     */
    async store({request}) {
        const { email, password } = request.all()

        await User.create({
            email,
            password,
            username: email
        })

        return this.login(...arguments)
    }
}

module.exports = UserController
