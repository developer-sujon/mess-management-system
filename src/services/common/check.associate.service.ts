const checkAssociateService = async (associateModel: any, matchObject: any) => {
  const data = await associateModel.aggregate([
    {
      $match: matchObject,
    },
  ]);

  return data.length > 0;
};

export default checkAssociateService;
