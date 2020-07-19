import * as types from "./ActionTypes";

const storageValue = localStorage.getItem("users");
const initialState = storageValue ? JSON.parse(storageValue) : [];

export default function reducers(state = initialState, action) {
  if (action.type === types.CREATE_USER) {
    const { userName, contactNumber, profilePic } = action.payload;
    const users = [
      ...state,
      { id: state.length + 1, userName, contactNumber, profilePic },
    ];
    localStorage.setItem("users", JSON.stringify(users));
    return users;
  } else if (action.type === types.EDIT_USER) {
    const { id, userName, contactNumber, profilePic } = action.payload;
    const editedUsers = state.map((user) => {
      if (user.id === id) return { id, userName, contactNumber, profilePic };
      else return user;
    });
    localStorage.setItem("users", JSON.stringify(editedUsers));
    return editedUsers;
  } else if (action.type === types.DELETE_USER) {
    const newUsers = state.filter((user) => user.id !== action.payload.id);
    localStorage.setItem("users", JSON.stringify(newUsers));
    return newUsers;
  } else {
    return state;
  }
}
