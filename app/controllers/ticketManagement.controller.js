const {
  CreateTicketService,
  ListAllTicketService,
} = require("../services/tickets.service");
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require("../response/response");

const CreateTicket = async (req, res) => {
  let params = req.body;
  let userId = req.user._id;
  params.userID = userId;
  params.priorityScore = req.body.priorityScore ? req.body.priorityScore : "1";
  const result = await CreateTicketService(params);
  if (!result.status) {
    return sendErrorResponse(
      req,
      res,
      result?.statusCode,
      result?.message,
      result?.data
    );
  }
  return sendSuccessResponse(
    req,
    res,
    result?.statusCode,
    result?.message,
    result?.data
  );
};

const ListAllTickets = async (req, res) => {
  const result = await ListAllTicketService(params);
  //   if (!result.status) {
  //     return sendErrorResponse(
  //       req,
  //       res,
  //       result?.statusCode,
  //       result?.message,
  //       result?.data
  //     );
  //   }
  //   return sendSuccessResponse(
  //     req,
  //     res,
  //     result?.statusCode,
  //     result?.message,
  //     result?.data
  //   );
};

module.exports = { CreateTicket, ListAllTickets };
