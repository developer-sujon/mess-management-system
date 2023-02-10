const createParentChildService = async (
  request: any,
  parentModel: any,
  childModel: any,
  joinPropertyName: string,
  session: any
) => {
  //create parent
  const parent = request.body['parent'];
  parent.customerID = request.body['customerID'];
  const newParent = new parentModel(parent);

  const parentCreation = await newParent.save({ session });

  //create childs
  const childs = request.body['childs'];

  childs.forEach((element: any) => {
    element[joinPropertyName] = parentCreation._id;
    element['customerID'] = request.body['customerID'];
  });

  const childsCreation = await childModel.insertMany(childs, { session });

  return { parent: parentCreation, childs: childsCreation };
};

export default createParentChildService;
