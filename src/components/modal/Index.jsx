import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ModalC from "./subModal/Index";
import { openModalState } from "../../features/modalC.slice";
const Index = (props) => {
  const dispatch = useDispatch();
  let subtitle;
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const [query, setQuery] = useState();
  const getModalBackgroundColor = () => {
    switch (props.name) {
      case "All Contacts":
        return "#46139f";
      case "US Contacts":
        return "#ff7f50";
    }
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      maxHeight: "700px",
      width: "400px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: getModalBackgroundColor(),
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // Api call funciton

  const acpCallFunction = async () => {
    const response = await fetch(
      "https://contact.mediusware.com/api/contacts/"
    );
    const res = await response.json();
    setData(res.results);
    setFilteredData(res.results);
  };
  const filterData = () => {
    if (checkbox === true) {
      const filtered = data.filter((item) => item.id % 2 === 0);
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };
  const handleSearch = (e) => {
    const q = e.target.value;
    const filtered = data.filter((item) =>
      item.phone.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleNewModal = () => {
    dispatch(openModalState(true));
  };

  useEffect(() => {
    acpCallFunction();
  }, []);
  useEffect(() => {
    filterData();
  }, [checkbox]);
  useEffect(() => {
    if (!modalIsOpen) navigate("/problem-2");
    if (props.name === "All Contacts" && modalIsOpen)
      navigate("/problem-2/modal-A");
    if (props.name === "US Contacts" && modalIsOpen)
      navigate("/problem-2/modal-B");
  }, [props.name, modalIsOpen]);
  return (
    <>
      <div>
        <button onClick={openModal} className={props.stl} type="button">
          {props.name}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>{props.title}</h2>
          <button
            onClick={closeModal}
            className="btn"
            style={{
              float: "right",
              border: "1px solid #ccc",
              backgroundColor: "red",
              color: "#fff",
            }}
          >
            close
          </button>

          <div
            className="table-wrapper-scroll-y my-custom-scrollbar"
            style={{ maxHeight: "300px", overflowY: "scroll" }}
          >
            <input placeholder="Search here" onChange={handleSearch} />
            <table className="table table-bordered table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">Contract</th>
                </tr>
              </thead>
              <tbody style={{ overflow: "auto" }}>
                {props.name === "All Contacts" &&
                  modalIsOpen &&
                  filteredData?.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td onClick={handleNewModal}>{item.phone}</td>
                      </tr>
                    );
                  })}
                {props.name === "US Contacts" &&
                  modalIsOpen &&
                  filteredData?.map((item) => {
                    if (item.country.name === "United States")
                      return (
                        <tr key={item.id}>
                          <td>{item.phone}</td>
                        </tr>
                      );
                  })}
              </tbody>
            </table>
          </div>

          {props.name === "All Contacts" && modalIsOpen && (
            <input
              type="checkbox"
              name="checkbox"
              value="even"
              onChange={(e) => setCheckbox(e.target.checked)}
            />
          )}
        </Modal>
      </div>
      <ModalC />
    </>
  );
};

export default Index;
