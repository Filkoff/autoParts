const sortItems = (items) => {
  let sortedItems = {};
  for (let i of items) {
    if (!(i.dealer.name in sortedItems)) {
      sortedItems[i.dealer.name] = [i];
    } else {
      sortedItems[i.dealer.name].push(i);
    }
  }
  return sortedItems;
};

export default sortItems;
