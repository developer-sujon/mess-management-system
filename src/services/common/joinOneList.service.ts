const joinOneList = async (
  dataModel: any,
  matchQuery: any,
  JoinStage: any,
  projection: any
) => {
  return await dataModel.aggregate([
    matchQuery,
    JoinStage,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

export default joinOneList;
