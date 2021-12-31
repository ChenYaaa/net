export const createUserStart = () => ({
    type: "CREATE_USER_START",
  });
  
  export const createUserSuccess = (user) => ({
    type: "CREATE_USER_SUCCESS",
    payload: user,
  });
  
  export const createUserFailure = () => ({
    type: "CREATE_USER_FAILURE",
  });