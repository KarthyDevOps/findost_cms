const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");
const { Faq } = require("../models/faq");

const {
    convert_JSON_to_file,
    formatDataList,
    pageMetaService,
} = require("../helpers/index");

const { getCouseManagementList } = require("./list.service");
const { courseManagement } = require("../models/courseManagement");


const createCourseManagementService = async (params) => {
    var newvalues = params;
    let checkExist = await courseManagement.findOne({
        courceId: params?.courceId,
        apId: params?.apId,

    })

    if (checkExist) {
       
        params.completedlecture.push(params?.completedlecture)

        const resp = await courseManagement.findOneAndUpdate({ apId: params?.apId, courceId:params?.courceId }, params);
        return {
            status: true,
            statusCode: statusCodes?.HTTP_OK,
            message: messages?.created,
            data: resp
        };

    }
    else {
        newvalues.completedlecture = [newvalues?.completedlecture]
        const resp = await courseManagement.create(newvalues);
        return {
            status: true,
            statusCode: statusCodes?.HTTP_OK,
            message: messages?.created,
            data: {
                _id: resp?._id,
            },
        };
    }

};

const getCourseManagementService = async (params) => {
    var payload = {
        _id: params?.courceId,
        isDeleted: false,
    };
    const resp = await courseManagement.findOne(payload);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.success,
        data: resp,
    };
};

const updateCourseManagementService = async (params) => {
    var payload = {
        _id: params?.courceId,
        isDeleted: false,
    };
    delete params["courceId"];
    var newvalues = {
        $set: params,
    };
    const resp = await courseManagement.updateOne(payload, newvalues);
    if (!resp.modifiedCount) {
        return {
            status: false,
            statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
            message: messages?.somethingWrong,
            data: [],
        };
    }
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.updated,
        data: [],
    };
};

const CourseManagementListService = async (params) => {
    params.all = true;
    const allList = await getCouseManagementList(params);
    params.all = params.returnAll == true ? true : false;

    const result = await getCouseManagementList(params);
    const pageMeta = await pageMetaService(params, allList?.data?.length || 0);
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        data: { list: result?.data, pageMeta },
    };
};

const deleteCourseManagementService = async (params) => {
    let ids = [];
    if (params.id) ids.push(params?.id);
    else if (params.ids) {
        ids = params.ids;
    }
    var newvalues = {
        $set: {
            isDeleted: true,
            updatedBy: params?.updatedBy,
            lastUpdatedBy: params?.lastUpdatedBy,
        },
    };

    const resp = await courseManagement.updateMany({ _id: ids }, newvalues);
    if (!resp.modifiedCount) {
        return {
            status: false,
            statusCode: statusCodes?.HTTP_UNPROCESSABLE_ENTITY,
            message: messages?.somethingWrong,
            data: [],
        };
    }
    return {
        status: true,
        statusCode: statusCodes?.HTTP_OK,
        message: messages?.deleted,
        data: [],
    };
};

//

module.exports = {
    createCourseManagementService,
    getCourseManagementService,
    updateCourseManagementService,
    CourseManagementListService,
    deleteCourseManagementService
};
