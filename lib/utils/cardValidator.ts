export const validateCardNumber = (value: string) => {
  const pattern =
    /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;
  return (
    pattern.test(value) ||
    "Invalid card number format (e.g., XXXX-XXXX-XXXX-XXXX)"
  );
};

export const validateCardName = (value: string) => {
  const pattern = /^[A-Za-z]+\s[A-Za-z]+$/;
  return pattern.test(value) || "Invalid name format (e.g., First Last)";
};
