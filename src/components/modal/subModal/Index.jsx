import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import {
  openModalState,
  selectModalState,
} from "../../../features/modalC.slice";
import { useDispatch } from "react-redux";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#46139f",
  },
};
const Index = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const modalOpen = useSelector(selectModalState);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    dispatch(openModalState(false));
  }
  const acpCallFunction = async () => {
    const response = await fetch(
      "https://contact.mediusware.com/api/contacts/"
    );
    const res = await response.json();
    setData(res.results);
  };
  useEffect(() => {
    setIsOpen(modalOpen);
  }, [modalOpen]);
  useEffect(() => {
    acpCallFunction();
  }, []);
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <>
          <p>
            {data?.map((i) => {
              return (
                <span key={i.id} style={{ color: "white" }}>
                  data id= {i.id} <br />
                </span>
              );
            })}
          </p>
        </>
      </Modal>
    </div>
  );
};

export default Index;
