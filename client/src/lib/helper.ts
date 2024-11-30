export const formatToIDR = (amount: number | undefined): string => {
  if (amount === undefined) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (isoDateString: string | undefined): string => {
  try {
    if (isoDateString === undefined) return "Invalid date";
    const date = new Date(isoDateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  } catch (error) {
    console.error("Invalid date string:", error);
    return "Invalid date";
  }
};
