'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ResourceNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (erro, { response }) {
    return response.status(404).json({
      error: "Resource doesn't exists"
    })
  }
}

module.exports = ResourceNotFoundException
