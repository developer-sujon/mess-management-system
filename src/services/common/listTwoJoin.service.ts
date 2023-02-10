const listTwoJoinService = async (
  matchQuery: any,
  dataModel: any,
  joinStageOne: any,
  joinStageTwo: any,
  projection: any
) => {
  return await dataModel.aggregate([
    matchQuery,
    joinStageOne,
    joinStageTwo,
    {
      $sort: { _id: -1 },
    },
    projection,
  ]);
};

export default listTwoJoinService;
