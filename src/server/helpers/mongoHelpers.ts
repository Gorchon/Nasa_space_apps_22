export const getFuzzySearchRegex = (text: string) => {
  const escapedSearch = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const regex = new RegExp(escapedSearch, 'gi');
  return regex;
};
