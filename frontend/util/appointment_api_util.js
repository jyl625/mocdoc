export const requestAppointment = (appointmentId) => {
  return $.ajax({
    method: "GET",
    url: `/api/appointments/${appointmentId}`
  })
}

export const createAppointment = (appointment) => {
  return $.ajax({
    method: "POST",
    url: `/api/appointments`,
    data: { appointment }
  })
}

export const updateAppointment = (appointment) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/appointments/${appointment.id}`,
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