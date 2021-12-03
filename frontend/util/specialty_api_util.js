export const fetchSpecialties = specialtyName => (
  $.ajax({
    method: 'GET',
    url: `/api/specialties?name=${specialtyName}`
  })
);