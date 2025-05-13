export const formatMinutes = (totalMinutes: number): string => {
  if (totalMinutes === 0 || totalMinutes < 0) {
    return "0";
  }

  if (isNaN(totalMinutes)) {
    return "";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes.toString().padStart(2, "0")}min`;
};
