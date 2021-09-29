import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { openModal, addData, editedData } from "../Services/Actions";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { v4 as uuidv4 } from "uuid";
const ModalAddEdit = () => {
  const dispatch = useDispatch();

  const editData = useSelector((state) => state?.toBeEdited);
  const [range, setRange] = useState(editData?.range);
  const [name, setName] = useState(editData?.name);
  const [chkError, setErrorchk] = useState(false);
  const [status, setStatus] = useState("");
  const [task, setTask] = useState(editData?.task);
  const [hobby, setHobby] = useState(editData?.hobby);

  const [value, onChange] = useState(new Date());
  const show = useSelector((state) => state?.openModal);
  const previousData = useSelector((state) => state?.data);
const lengthEdit=Object.keys(editData).length
  const handleClose = () => {
    dispatch(openModal(false));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try{const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());

    formDataObj.name = name;
    formDataObj.task = task;
    formDataObj.status = status;
    formDataObj.hobby = hobby;
    formDataObj.range = range;
    formDataObj.id = lengthEdit>0 ? editData?.id : uuidv4();
    if (lengthEdit>0) {
      const data = previousData?.map((data) => {
        if (data.id === editData?.id) {
          data = formDataObj;
        }
        return data;
      });
      dispatch(editedData(data));
    } else {
      const data =
        previousData?.length > 0
          ? [...previousData, formDataObj]
          : [formDataObj];
      dispatch(addData(data));
      setName("");
      setRange(0);
      setTask("");
      setHobby("");
    }}
    catch(e){
      console.log(e)
    }

    handleClose();
  };
  const handleRange = (e) => {
    setRange(e.target.value);
  };
  const handleNameChange = (e) => {
    try{var RegExpression = /^[a-zA-Z\s]*$/;
    if (e.target.value.match(RegExpression)) {
      setName(e.target.value);
      setErrorchk(false);
    } else {
      setErrorchk(true);
    }}
    catch(e){
      console.log(e)
    }
  };
 
  const handleHobbyChange = (e) => {
    setHobby(e.target.value);
  };
  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };
  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];
  const handleSelectChange = (selectVal) => {
    setStatus(selectVal.value);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{lengthEdit>0?"Edit TODO":"Add TODO"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => handleNameChange(e)}
              />
              {chkError && (
                <p>
                  Please Enter only Aplhabets
                </p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <div style={{ display: "block" }}>
                <input type="radio" id="Male" name="gender" value="Male" />
                <label htmlFor="Male">Male</label>
                <input type="radio" id="Female" name="gender" value="Female" />
                <label htmlFor="Female">Female</label>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hobby</Form.Label>
              <div style={{ display: "block" }}>
                <input
                  type="checkbox"
                  id="Sports"
                  name="hobby"
                  value="Sports"
                  onChange={handleHobbyChange}
                />
                <label for="Sports"> Sports</label>
                <input
                  type="checkbox"
                  id="Reading"
                  name="hobby"
                  value="Reading"
                  onChange={handleHobbyChange}
                />
                <label for="Reading"> Reading</label>
                <input
                  type="checkbox"
                  id="Music"
                  name="hobby"
                  value="Music"
                  onChange={handleHobbyChange}
                />
                <label    htmlFor="Music"> Music</label>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              
              <Form.Range onChange={handleRange} value={range}  min={18} max={55} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <DatePicker onChange={onChange} value={value} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                value={task}
                onChange={(e) => {
                  handleTaskChange(e);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Select options={options} onChange={handleSelectChange} />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ModalAddEdit;
