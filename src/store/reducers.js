import * as types from "./ActionTypes";

const initialState = [];

export default function reducers(state = initialState, action) {
  if (action.type === types.CREATE_USER) {
    const { userName, contactNumber, profilePic } = action.payload;
    return [
      ...state,
      { id: state.length + 1, userName, contactNumber, profilePic },
    ];
  } else if (action.type === types.EDIT_USER) {
    const { id, userName, contactNumber, profilePic } = action.payload;
    return state.map((user) => {
      if (user.id === id) return { id, userName, contactNumber, profilePic };
      else return user;
    });
  } else if (action.type === types.DELETE_USER) {
    return state.filter((user) => user.id !== action.payload.id);
  } else {
    return state;
  }
}
