import {
  ADD_DATA,
  EDIT_DATA,
  DELETE_DATA,
  OPEN_MODAL,
  FINAL_EDIT,
} from "./types";

const initialState = {
  openModal: false,
  data: [],
  toBeEdited: {},
};
const reducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_DATA:
      return { ...state, data: payload };
    case EDIT_DATA:
      return { ...state, toBeEdited: payload };
    case DELETE_DATA:
      let tempData = state?.data;
      tempData.forEach((data, index) => {
        if (data?.id === payload) {
          tempData.splice(index, 1);
        }
      });
      return { ...state, data: tempData };
    case FINAL_EDIT:
      return {
        ...state,
        data: payload,
        toBeEdited: {},
      };
    case OPEN_MODAL:
      return { ...state, openModal: payload };
    default:
      return state;
  }
};
export default reducer;
