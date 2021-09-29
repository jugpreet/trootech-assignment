import { ADD_DATA,EDIT_DATA,OPEN_MODAL,FINAL_EDIT ,DELETE_DATA} from "./types";


  export const addData = (data) => (
  {
    type: ADD_DATA,
    payload: data,
  });

  export const editData = (data) => ({
    type: EDIT_DATA,
    payload: data,
  });

  export const editedData = (data) => ({
    type: FINAL_EDIT,
    payload: data,
  });
  export const deleteData = (data) => ({
    type: DELETE_DATA,
    payload: data,
  });

  export const openModal=(data)=>(
    {
    
type:OPEN_MODAL,
payload:data
  });