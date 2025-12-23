export const formatIndianNumber = (value) => {
  // Provide a default value of "0" if the input is undefined or null
  const sanitizedValue = value || "0";

  // Step 1: Remove existing commas and ensure two decimal places
  const number = parseFloat(sanitizedValue.replace(/,/g, "")).toFixed(2);

  // Step 2: Split the number into integer and decimal parts
  const parts = number.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Step 3: Add commas in the Indian numbering format
  const indianFormatted = integerPart.replace(/\B(?=(\d{1})+(?!\d))/g, ",");

  // Combine integer and decimal parts
  return `${indianFormatted}.${decimalPart}`;
};
