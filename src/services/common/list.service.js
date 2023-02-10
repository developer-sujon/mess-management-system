//External Lib Import
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const listService = async (request, dataModel) => {
  const proprietorId = request.proprietorId;
  const messID = request.messID;

  return await dataModel.aggregate([
    {
      $match: {
        proprietorId: new ObjectId(proprietorId),
        messID: new ObjectId(messID),
      },
    },
  ]);
};

module.exports = listService;
