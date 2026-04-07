import * as contentful from 'contentful';

export const client = contentful.createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

//access by content type and order by date (descending)
export const fetchOrderedData = (contentType, dateField = 'date') => {
  return client.getEntries({
    content_type: contentType,
    order: `-fields.${dateField}`,
  }).then(response => {
    
    const forcefullySortedItems = response.items.sort((a, b) => {
      const dateA = new Date(a.fields[dateField] || a.sys.createdAt);
      const dateB = new Date(b.fields[dateField] || b.sys.createdAt);
      
      return dateB - dateA;
    });
    return { ...response, items: forcefullySortedItems };
  });
};
