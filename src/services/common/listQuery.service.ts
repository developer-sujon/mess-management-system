//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const listQueryService = async (request: any, dataModel: any, matchQuery: any) => {
  matchQuery.proprietorId = new ObjectId(request.proprietorId);
  matchQuery.messID = new ObjectId(request.messID);

  return await dataModel.aggregate([
    {
      $match: matchQuery,
    },
  ]);
};

export default listQueryService;
