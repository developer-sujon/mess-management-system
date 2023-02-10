//External Lib Import
const httpStatus = require('http-status');

//Internal Lib Import
const ApiError = require('../../utils/ApiError');

const createService = async (dataModel, unique, uniqueValue, errorMessage, postBody) => {
  const uniqueData = await dataModel.aggregate([{ $match: uniqueValue }]);

  if (unique && uniqueData.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  const data = new dataModel(postBody);
  return await data.save();
};

module.export = createService;
