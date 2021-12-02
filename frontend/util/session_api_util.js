export const login = (user) => (
  $.ajax({
    url: "/api/session",
    method: "POST", 
    data: { user } 
  })
)

export const logout = () => (
  $.ajax({
    url: "/api/session",
    method: "DELETE"
  })
)

export const signup = user => (
  $.ajax({
    url: "/api/users",
    method: "POST",
    data: { user }
  })
)

export const fetchCurrentSession = () => (
  $.ajax({
    url:"/api/session",
    method: "GET"
  })
)

//test
export const updateUser = (user) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user }
  })
}

