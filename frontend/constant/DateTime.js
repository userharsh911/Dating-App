const formatRelativeTime = (dateStr)=>{
  const past = new Date(dateStr);
  const now = new Date();
  let diff = Math.floor((now - past) / 1000); // in seconds

  if (diff < 0) diff = Math.abs(diff); // future safety

  const seconds = diff;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  const weeks = Math.floor(diff / (86400 * 7));
  const months = Math.floor(diff / (86400 * 30));
  const years = Math.floor(diff / (86400 * 365));

  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 7) return `${days} days ago`;
  if (weeks < 5) return `${weeks} weeks ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
}

export default formatRelativeTime;