const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const { InternalServices } = require('../apiServices/index')
const coursemManagementSchema = new mongoose.Schema(
    {
        courseManagementId: {
            type: String
        },
        apId: {
            type: String
        },
        courseId: {
            type: String,
            required: false,
        },
        completedlecture: {
            type: Array,
            required: false,
        },
        iscompleted: {
            type: Boolean,
            required: false,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    }
);
coursemManagementSchema.pre('save', async function (next) {
    InternalServices.getSequenceId({ type: "courseManagement" });
    var doc = this;
    let counter = await InternalServices.getSequenceId({ type: "courseManagement" });
    doc.courseManagementId = (counter?.data?.count + 1).toString().padStart(6, '0').toString();;
    next();

});
const courseManagement = mongoose.model("courseManagement", coursemManagementSchema);
module.exports = { courseManagement };
