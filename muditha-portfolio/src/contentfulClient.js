import * as contentful from 'contentful';

export const client = contentful.createClient({
  space: '3z6zws5fs7ea',
  accessToken: 'D8v9WHyOqBQbmAGUYS-2IxLi1VfiZlzxaXlk2LkgM24',
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
