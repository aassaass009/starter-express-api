const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
}, { timeseries: true })

adminSchema.statics.isThisEmailAdmin = async function (email) {
    if (!email) throw new Error('Invalid email')
    try {
        const admin = await this.findOne({ email })
        if (admin) return false

        return true
    } catch (error) {
        console.log('error inside isThisEmailadmin method ', error.message)
        return false
    }
}

const Admin = mongoose.model('admin', adminSchema)
module.exports = Admin