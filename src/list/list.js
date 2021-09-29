import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table ,Modal} from "react-bootstrap";
import { openModal, deleteData, editData } from "../Services/Actions";
import ModalAddEdit from "../Components/ModalAddEdit";
const ListTODO = () => {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state?.data);
  // const listData1 = useSelector((state) => state);
const[deleteVal,setDelete]=useState(false)
const[deleteID,setDeleteID]=useState(0)
  const handleShow = () => {
    dispatch(openModal(true));
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
    setDelete(false)
  };
  const deleteItem=(id)=>{
    setDelete(true)
    setDeleteID(id)
  }
  const handleEdit = (data) => {
    dispatch(openModal(true));
    dispatch(editData(data));
  };
  const handleClose=()=>{
    setDelete(false)
  }
  return (
    <div>
      <h1>TODO</h1>
      <Button variant="primary" onClick={handleShow}>
        ADD TODO
      </Button>
      {listData.length > 0 && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>GENDER</th>
              <th>HOBBY</th>
              <th>AGE</th>
              <th>DATE</th>
              <th>TASK</th>
              <th>STATUS</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {listData?.map((data, index) => {
              return (
                <tr key={data?.id}>
                  <td>{index+1}</td>
                  <td>{data?.name}</td>
                  <td>{data?.gender}</td>
                  <td>{data?.hobby}</td>
                  <td>{data?.range}</td>
                  <td>{data?.date}</td>
                  <td>{data?.task}</td>
                  <td>{data?.status}</td>
                  <td>
                    <button onClick={() => handleEdit(data)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => deleteItem(data?.id)}>Del</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <ModalAddEdit />
      <Modal show={deleteVal}>
  <Modal.Body>
    <p>Are you sure you want to delete this task?</p>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="primary" onClick={()=>handleDelete(deleteID)}>Yes</Button>
    <Button variant="primary" onClick={handleClose}>No</Button>

  </Modal.Footer>
</Modal>
    </div>
  );
};
export default ListTODO;
