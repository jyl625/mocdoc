export const fetchProvider = id => (
  $.ajax({
    method: 'GET',
    url: `/api/providers/${id}`
  })
);

export const fetchProviders = (planIdQ, specialtyQ) => (
  $.ajax({
    method: 'GET',
    url: `/api/providers/?plan=${planIdQ}&specialty=${specialtyQ}`
  })
)

export const fetchFeaturedProviders = () => (
  $.ajax({
    method: 'GET',
    url: `/api/providers/?featured=true`
  })
)