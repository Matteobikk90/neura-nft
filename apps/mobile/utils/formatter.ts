export const formatDateTime = (minedAt: string | Date) =>
  new Date(minedAt).toLocaleString("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    year: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
