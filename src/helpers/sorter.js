
module.exports.makeSort = (sortBy) => {
  if (!sortBy)
    return {};

  let arSort = [];
  sortBy.forEach(element => {
    let fields = element.split('_');  
    arSort.push(`"${ fields[0] }": ${ fields[1] == "ASC" ? 1 : -1 }`);
  });
  
  return JSON.parse(`{ ${arSort.join(',') }}`);
}

