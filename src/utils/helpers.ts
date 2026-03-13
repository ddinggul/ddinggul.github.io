export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function sortByDate<T extends { data: { pubDate: Date } }>(posts: T[]): T[] {
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
