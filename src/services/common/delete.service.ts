//External Lib Import
import httpStatus from 'http-status';

//Internal Lib  import
import CustomError from '../../helpers/CustomError';

const deleteService = async (matchQuery: any, dataModel: any) => {
  const data = await dataModel.findOne(matchQuery);

  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, `${dataModel.collection.collectionName} Not Found`);
  }
  return await dataModel.deleteMany(matchQuery);
};

export default deleteService;
