export function formatDate(dateString: string | Date): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}