const handleFormatDate = (formattedStartDate, formattedEndDate) => {
  const [startDate, startMonth, startYear] = formattedStartDate.split("-");
  const newFormattedStartDate = `${startYear}-${startMonth}-${startDate}`;

  const [endDate, endMonth, endYear] = formattedEndDate.split("-");
  const newFormattedEndDate = `${endYear}-${endMonth}-${endDate}`;

  return { newFormattedStartDate, newFormattedEndDate };
};

export default handleFormatDate;
