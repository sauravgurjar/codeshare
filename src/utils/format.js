export function formatDateTime(isoString) {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return isoString;
  }
}

