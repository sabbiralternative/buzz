export const defaultDate = (date = 30) => {
  return new Date(new Date().setDate(new Date().getDate() - date));
};
