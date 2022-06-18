export function timeSince(date: Date) {
  const hoursSince = Math.max(
    1,
    Math.floor((new Date().valueOf() - date.valueOf()) / 36e5)
  );
  if (hoursSince == 1) {
    return "1 hour ago";
  }
  if (hoursSince < 24) {
    return `${hoursSince} hours ago`;
  }
  const daysSince = Math.floor(hoursSince / 24);
  return `${daysSince} days ago`;
}
