
module.exports.makeSort = (sortBy) => {
  if (!sortBy)
    return null;
  let fields = sortBy.split('_');
  return JSON.parse(`{"${ fields[0] }": "${ fields[1] == "ASC" ? 1 : -1 }"}`);
}

