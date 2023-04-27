import mongoose, { Schema } from 'mongoose'

const answers = new Schema({
    content: {
        type: Schema.Types.Mixed, default: null,
    },
    doubt: {
        type: Boolean, required: true, default: false,
    },
    point: {
        type: Number, required: true, default: 0,
    },
    correctedBy: {
        type: String, default: null,
    },
    questionId: {
        type: Schema.Types.ObjectId, required: true, ref: 'Participant',
    },
}, {
    timestamps: false,
})

const questions = new Schema({
    id: {
        type: String, required: true,
    },
    answerType: {
        type: String, default: null,
    },
    answerContent: {
        type: Schema.Types.Mixed, default: null,
    },
    weight: {
        type: Number, required: true, default: 0,
    },
    point: {
        type: Number, required: true, default: 0,
    },
    score: { // Calculate from (point * weight)
        type: Number, required: true, default: 0,
    },
    correctedBy: {
        type: String, default: null,
    },
}, {
    timestamps: false,
})

const groups = new Schema({
    groupId: {
        type: String, required: true,
    },
    weight: {
        type: Number, required: true, default: 0,
    },
    point: {
        type: Number, required: true, default: 0,
    },
    score: { // Calculate from (point * weight)
        type: Number, required: true, default: 0,
    },
    questions: [{ type: questions }],
}, {
    timestamps: false,
})

const schema = new Schema({
    startedAt: {
        type: Number, default: null,
    },
    finishedAt: {
        type: Number, default: null,
    },
    examId: {
        type: Schema.Types.ObjectId, required: true, index: true, ref: 'Exam',
    },
    packageId: {
        type: Schema.Types.ObjectId, default: null,
    },
    participantId: {
        type: Schema.Types.ObjectId, required: true, index: true, ref: 'Participant',
    },
    blocked: {
        type: Boolean, required: true, default: false,
    },
    answers: [{ type: answers }],
    result: {
        finalScore: { // Caclulate from sum group answer score.
            type: Number, required: true, default: 0,
        },
        detail: [{ type: groups }],
    },
}, {
    timestamps: true,
    versionKey: false,
})

const Model = mongoose.model('Answer', schema)

export default Model
