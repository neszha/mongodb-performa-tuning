import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
    order: {
        type: Number, required: true, default: 0,
    },
    title: {
        type: String, required: true, default: 'Untitled question (1)',
    },
    weight: {
        type: Number, required: true, default: 0,
    },
    autoCorrect: {
        type: Boolean, required: true, default: false,
    },
    content: {
        type: String, default: '',
    },
    answer: {
        type: {
            type: String, required: true,
        },
        content: {
            type: Schema.Types.Mixed, required: true,
        },
        key: {
            type: Schema.Types.Mixed,
        },
    },
    examId: {
        type: Schema.Types.ObjectId, required: true, index: true, ref: 'Exam',
    },
    packageId: {
        type: Schema.Types.ObjectId, required: true,
    },
    groupId: {
        type: Schema.Types.ObjectId, required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
})

const Model = mongoose.model('Question', schema)

export default Model
