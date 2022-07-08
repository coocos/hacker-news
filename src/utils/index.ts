export function timeSince(date: Date) {
  const hoursSince = Math.max(
    1,
    Math.floor((new Date().valueOf() - date.valueOf()) / 36e5)
  );
  if (hoursSince < 24) {
    return `${hoursSince}h`;
  }
  const daysSince = Math.floor(hoursSince / 24);
  return `${daysSince}d`;
}
