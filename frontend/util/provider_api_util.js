export const fetchProvider = id => (
  $.ajax({
    method: 'GET',
    url: `/api/providers/${id}`
  })
);