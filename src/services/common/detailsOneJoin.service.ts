const detailsOneJoin = async (
  dataModel: any,
  matchQuery: any,
  joinStage: any,
  projection: any
) => {
  return await dataModel.aggregate([
    matchQuery,
    joinStage,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

export default detailsOneJoin;
