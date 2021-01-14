'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const User = use('App/Models/User')

class Profile extends Model {
    user(){
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Profile
