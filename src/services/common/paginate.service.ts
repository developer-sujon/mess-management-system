//External Lib Import
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const paginateService = async (request: any, dataModel: any, searchArray: object[]) => {
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
      {
        $match: { $or: searchArray },
      },
      {
        $facet: {
          total: [{ $count: 'count' }],
          data: [{ $sort: { _id: -1 } }, { $skip: skipRow }, { $limit: perPage }],
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
      {
        $facet: {
          total: [{ $count: 'count' }],
          data: [{ $sort: { _id: -1 } }, { $skip: skipRow }, { $limit: perPage }],
        },
      },
    ]);
  }
};

export default paginateService;
