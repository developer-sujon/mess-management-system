//External Lib Import
import httpStatus from 'http-status';

//Internal Lib Import
import CustomError from '../../helpers/CustomError';
import detailsService from './details.service';
import StoreModel from '../../models/Store.model';

const createService = async (request: any, dataModel: any, unique: boolean, uniqueValue: any) => {
  const matchQuery = {
    $match: {
      storeUserName: request.body.storeUserName,
    },
  };

  const projection = {
    $project: {
      _id: 1,
      proprietorID: 1,
    },
  };

  const storeDetails = await detailsService(StoreModel, matchQuery, projection);

  request.body.proprietorID = storeDetails[0].proprietorID;
  request.body.messID = storeDetails[0]._id;

  const uniqueData = await dataModel.aggregate([{ $match: uniqueValue }]);

  if (unique && uniqueData.length > 0) {
    throw new CustomError(httpStatus.BAD_REQUEST, `${dataModel.collection.collectionName} already created`);
  }

  const data = new dataModel(request.body);
  return await data.save();
};

export default createService;
