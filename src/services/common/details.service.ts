const detailsService = async (
  dataModel: any,
  matchQuery: any,
  projection: any
) => {
  return await dataModel.aggregate([
    matchQuery,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

export default detailsService;
