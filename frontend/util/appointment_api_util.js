
export const createAppointment = (appointment) => {
  return $.ajax({
    method: "POST",
    url: `/api/appointments`,
    data: { appointment }
  })
}

export const deleteAppointment = (appointmentId) => {
  console.log("hits promise")
  return $.ajax({
    method: "DELETE",
    url: `/api/appointments/${appointmentId}`
  })
}