export const fetchInsurance = planId => (
  $.ajax({
    method: 'GET',
    url: `/api/insurances/${planId}`
  })
);

export const fetchInsurances = carrier => (
  $.ajax({
    method: 'GET',
    url: `/api/insurances?carrier=${carrier}`
  })
);