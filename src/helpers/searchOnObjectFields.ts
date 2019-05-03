const searchOnObjectFields = (searchText: string) => (map: {
  [key: string]: string;
}) => {
  return Object.keys(map).some(
    (key) =>
      map[key].indexOf &&
      map[key].toLocaleLowerCase &&
      map[key].toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1,
  );
};

export default searchOnObjectFields;
