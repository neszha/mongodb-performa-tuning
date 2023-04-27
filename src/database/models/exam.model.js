import mongoose, { Schema } from 'mongoose'

const managersSchama = new Schema({
    id: {
        type: Schema.Types.ObjectId, required: true, index: true, ref: 'Manager',
    },
    owner: {
        type: Boolean, required: true, default: true,
    },
}, {
    timestamps: { createdAt: true, updatedAt: false },
})

const packageSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, auto: true,
    },
    order: {
        type: Number, required: true, default: 0,
    },
    name: {
        type: String, required: true, default: 'Untitled Package!',
    },
    description: {
        type: String, required: true, default: 'No description!',
    },
    enabled: {
        type: Boolean, required: true, default: false,
    },
}, {
    timestamps: true,
})

const groupSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, auto: true,
    },
    order: {
        type: Number, required: true, default: 0,
    },
    name: {
        type: String, required: true, default: 'Untitled Group!',
    },
    description: {
        type: String, required: true, default: 'No description!',
    },
    weight: {
        type: Number, required: true, default: 0,
    },
    packageId: {
        type: Schema.Types.ObjectId, required: true,
    },
    questions: [{
        type: Schema.Types.ObjectId,
    }],
}, {
    timestamps: true,
})

const participantsSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId, required: true, index: true, ref: 'Participant',
    },
    answerId: {
        type: Schema.Types.ObjectId, required: true, ref: 'Answer',
    },
}, {
    timestamps: false,
})

const filesSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId, auto: true,
    },
    name: {
        type: String, required: true,
    },
    type: {
        type: String, required: true, enum: ['audio', 'image', 'video', 'unknown'], default: 'unknown',
    },
}, {
    timestamps: true,
})

const schema = new Schema({
    name: {
        type: String, required: true,
    },
    description: {
        type: String, required: true,
    },
    active: {
        type: Boolean, required: true, default: false, index: true,
    },
    scheduling: {
        start: {
            type: Number, default: null,
        },
        end: {
            type: Number, default: null,
        },
        allocation: {
            type: Number, default: 0, min: 0, // Menit
        },
        allowDoneAfter: {
            type: Number, default: 0, min: 0, // Menit
        },
    },
    settings: {
        randomPackage: {
            type: String, required: true, enum: ['first', 'random', 'id-sort-random'], default: 'first',
        },
        randomQuestion: {
            type: Boolean, required: true, default: false,
        },
        randomOption: {
            type: Boolean, required: true, default: false,
        },
        showScore: {
            type: Boolean, required: true, default: false,
        },
    },
    onlineDetector: {
        enabled: {
            type: Boolean, require: true, default: false,
        },
        timeout: { // Second
            type: Number, require: true, min: 1, default: 5,
        },
    },
    useSecureDevice: {
        type: Boolean, require: true, default: false,
    },
    managers: [{ type: managersSchama }],
    participants: [{ type: participantsSchema }],
    question: {
        packages: [{ type: packageSchema }],
        groups: [{ type: groupSchema }],
    },
    files: [{ type: filesSchema }],
}, {
    timestamps: true,
    versionKey: false,
})

const Model = mongoose.model('Exam', schema)

export default Model
