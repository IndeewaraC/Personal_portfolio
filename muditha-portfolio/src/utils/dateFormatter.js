export const getFormattedLastModified = () => {
  const date = new Date(document.lastModified);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};