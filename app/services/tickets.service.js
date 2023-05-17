const { Tickets } = require("../models/tickets");
const { statusCodes } = require("../response/httpStatusCodes");
const { statusMessage } = require("../response/httpStatusMessages");
const { messages } = require("../response/customMesages");

const CreateTicketService = async (params) => {
  let body = params;
  let response = await Tickets.create(body);
  if (response) {
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.created,
      data: response,
    };
  }
  return {
    status: false,
    statusCode: statusCodes?.HTTP_BAD_REQUEST,
    message: messages?.somethingWrong,
  };
};

const ListAllTicketService = async (params) => {
  let body = params;
  let response = await Tickets.find();
  if (response) {
    return {
      status: true,
      statusCode: statusCodes?.HTTP_OK,
      message: messages?.created,
      data: response,
    };
  }
  return {
    status: false,
    statusCode: statusCodes?.HTTP_BAD_REQUEST,
    message: messages?.somethingWrong,
  };
};

module.exports = { CreateTicketService, ListAllTicketService };
