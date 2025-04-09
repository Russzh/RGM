export const formatMinutes = (totalMinutes: number): string => {
  if (isNaN(totalMinutes) || !totalMinutes || totalMinutes < 0) {
    return "";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, "0")}min`;
};
