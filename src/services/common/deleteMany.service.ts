//External Lib Import
import httpStatus from 'http-status';

//Internal Lib  import
import CustomError from '../../helpers/CustomError';

const deleteService = async (request: any, dataModel: any) => {
  const deleteId = request.body.customerId;
  const proprietorId = request.proprietorId;
  const messID = request.messID;

  const data = await dataModel.findOne({
    customerId: deleteId,
    proprietorId,
    messID,
  });

  if (!data) {
    throw new CustomError(httpStatus.BAD_REQUEST, `${dataModel.collection.collectionName} Not Found`);
  }
  await dataModel.deleteMany({ customerId: deleteId, proprietorId, messID });

  return data;
};

export default deleteService;
