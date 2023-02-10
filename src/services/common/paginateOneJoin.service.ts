//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const paginateOneJoinService = async (request: any, dataModel: any, searchArray: any, projection: {}, joinStageOne: {}) => {
  const proprietor = request.proprietor;
  const store = request.store;
  const searchKeyword = request.params.searchKeyword;
  const pageNumber = +request.params.pageNumber;
  const perPage = +request.params.perPage;
  const skipRow = (pageNumber - 1) * perPage;

  if (searchKeyword !== '0') {
    return await dataModel.aggregate([
      {
        $match: {
          proprietor: new ObjectId(proprietor),
          store: new ObjectId(store),
        },
      },
      joinStageOne,
      {
        $match: { $or: searchArray },
      },
      {
        $facet: {
          total: [{ $count: 'count' }],
          data: [{ $skip: skipRow }, { $sort: { _id: -1 } }, { $limit: perPage }, projection],
        },
      },
    ]);
  } else {
    return await dataModel.aggregate([
      {
        $match: {
          proprietor: new ObjectId(proprietor),
          store: new ObjectId(store),
        },
      },
      joinStageOne,
      {
        $facet: {
          total: [{ $count: 'count' }],
          data: [{ $skip: skipRow }, { $sort: { _id: -1 } }, { $limit: perPage }, projection],
        },
      },
    ]);
  }
};

export default paginateOneJoinService;
