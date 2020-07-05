import * as types from "./ActionTypes";

export const createUser = (userName, contactNumber, profilePic) => {
  return {
    type: types.CREATE_USER,
    payload: {
      userName,
      contactNumber,
      profilePic,
    },
  };
};

export const editUser = (id, userName, contactNumber, profilePic) => {
  return {
    type: types.EDIT_USER,
    payload: {
      id,
      userName,
      contactNumber,
      profilePic,
    },
  };
};

export const deleteUser = (id) => {
  return {
    type: types.DELETE_USER,
    payload: {
      id,
    },
  };
};
