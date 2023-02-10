//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const dropDownService = async (request: any, dataModel: any, projection: object) => {
  const proprietor = request.proprietor;
  const store = request.store;

  return await dataModel.aggregate([
    {
      $match: {
        proprietor: new ObjectId(proprietor),
        store: new ObjectId(store),
      },
    },
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

export default dropDownService;
