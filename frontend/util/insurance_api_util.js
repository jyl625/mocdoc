// export const fetchInsurances = id => (
//   $.ajax({
//     method: 'GET',
//     url: `/api/insurances/${id}`
//   })
// );
export const fetchInsurances = carrier => (
  $.ajax({
    method: 'GET',
    url: `/api/insurances?carrier=${carrier}`
  })
);