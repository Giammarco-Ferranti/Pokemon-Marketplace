export const filterRequest = (obj) => {
  const filterData = Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== "" && obj[key] !== undefined && obj[key] !== null) {
      acc.push({ key, value: obj[key] });
    }
    return acc;
  }, []);

  return filterData;
};

//this function returns the keys and the values that are correct
