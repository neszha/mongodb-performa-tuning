import mongoose, { Schema } from 'mongoose'

/** Main schema. */
const schema = new Schema({
    username: {
        type: String, required: true, index: true, unique: true,
    },
    password: {
        type: String, required: true,
    },
    studentId: {
        type: String, required: true,
    },
    name: {
        type: String, required: true,
    },
    schoolName: {
        type: String, required: true,
    },
    classId: {
        type: Schema.Types.ObjectId, required: true, index: true, ref: 'Class',
    },
    roomId: {
        type: Schema.Types.ObjectId, required: true, index: true, ref: 'Room',
    },
    session: {
        type: String, required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
})
const Model = mongoose.model('compound_index_participants', schema)

export default Model
