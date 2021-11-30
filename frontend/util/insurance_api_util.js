export const fetchInsurances = hios_id => (
  $.ajax({
    method: 'GET',
    url: `/api/insurances/${hios_id}`
  })
);