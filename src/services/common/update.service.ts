//External Lib Import
import httpStatus from 'http-status';

//Internal Lib  import
import CustomError from '../../helpers/CustomError';

const updateService = async (dataModel: any, matchQuery: any, postBody: any) => {
  const data = await dataModel.findOne(matchQuery);

  console.log(data);

  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, `${dataModel.collection.collectionName} Not Found`);
  }

  Object.assign(data, postBody);
  return await data.save();
};

export default updateService;
