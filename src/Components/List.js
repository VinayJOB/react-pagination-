import React, { useState, useEffect } from "react";
import classes from "./List.module.css";
import AddFormModal from "./AddFormModal";
import EditFormModal from "./EditFormModal";
import Pagination from "./Pagination";
import "bootstrap/dist/css/bootstrap.min.css";

const List = () => {
  const [modalShow, setModalShow] = useState(false);
  const [editmodalShow, setEditModalShow] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [dataShow, setDataShow] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    tableData();
  }, [currentPageNumber]);
  const listModalShow = () => {
    setModalShow(true);
  };
  const listModalHide = () => {
    setModalShow(false);
  };
  const listformModalShow = () => {
    setEditModalShow(true);
  };
  const listformModalHide = () => {
    setEditModalShow(false);
  };

  //API CALL
  const tableData = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 77927b69bb144b065ca11bf2a9d452819cd852db"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      page: currentPageNumber,
    });

    var requestOptions = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://api.timesascent.com/v1/api/apiTimes/GetAllEmailTemplates",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setDataShow(result.All_Email_Templates);
      })
      .catch((error) => console.log("error", error));
  };

  const onEditModalHandler = (Id) => {
    setId(Id);
    setEditModalShow(true);
  };

  const pageNumberHandler = (pageNo) => {
    setCurrentPageNumber(pageNo);
  };
  // console.log(currentPageNumber);
  return (
    <>
      {modalShow && (
        <AddFormModal
          showModal={listModalShow}
          hideModal={listModalHide}
          onGetAllData = {tableData}
          size="lg"
        />
      )}
      {editmodalShow && (
        <EditFormModal
          showformModal={listformModalShow}
          hideformModal={listformModalHide}
          onGetAllData = {tableData}
          id={id}
          size="lg"
        />
      )}

      <div className={classes.maindiv}>
        <div className={classes.Upeerdiv}>
          {/* <button className={classes.btn1}>Copy</button>
          <button className={classes.btn2}>Csv</button>
          <button className={classes.btn3}>Excel</button>
          <button className={classes.btn4}>PDF</button>
          <button className={classes.btn5}>Print</button> */}
          <button className={classes.Add_Button} onClick={listModalShow}>
            Add
          </button>
        </div>
        <div className={classes.divsearch}>
          <span className={classes.spansearch}> Search: </span>
          {/* search filter logic  */}
          <input
            type="search"
            className={classes.searchbar}
            placeholder=""
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
        </div>

        <table className={classes.table}>
          <tr className={classes.tr}>
            <th>Id</th>
            <th>TemplateName</th>
            <th>Subject</th>
            <th colspan="2">Body</th>
          </tr>
          <tbody>
            {dataShow
              .filter((data) => {
                if (searchItem === "") {
                  return dataShow;
                } else if (
                  data.TemplateName.toLowerCase().startsWith(
                    searchItem.toLowerCase()
                  )
                ) {
                  return data.TemplateName;
                }
              })
              .map((item, value) => {
                return (
                  <tr key={item.Id}>
                    <td>{item.Id}</td>
                    <td>{item.TemplateName}</td>
                    <td>{item.Subject}</td>
                    <td>{item.Body}</td>
                    <td>
                      <button
                        className={classes.Edit_Button}
                        onClick={() => {
                          onEditModalHandler(item.Id);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className={classes.footer}>
          <div className={classes.Pagination}>
            <Pagination pageNumberHandler={pageNumberHandler} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default List;
