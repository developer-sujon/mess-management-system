const deleteParentChildService = async (
  request: any,
  parentModel: any,
  childModel: any,
  joinPropertyName: string,
  session: any
) => {
  let childDeleteQuery: any;
  childDeleteQuery = {};
  childDeleteQuery['proprietor'] = request.proprietor;
  childDeleteQuery['store'] = request.store;
  childDeleteQuery['customerID'] = request['customerID'];
  childDeleteQuery[joinPropertyName] = request.params.id;

  const deleteChilds = await childModel
    .deleteMany(childDeleteQuery)
    .session(session);

  let parentDeleteQuery: any;
  parentDeleteQuery = {};
  parentDeleteQuery['proprietor'] = request.proprietor;
  parentDeleteQuery['store'] = request.store;
  parentDeleteQuery['customerID'] = request.body['customerID'];
  parentDeleteQuery['_id'] = request.params.id;

  const deleteParent = await parentModel
    .deleteMany(parentDeleteQuery)
    .session(session);

  return { deleteChilds, deleteParent };
};

export default deleteParentChildService;
