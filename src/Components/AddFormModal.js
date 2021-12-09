import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import classes from "./AddFormModal.module.css";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const ListModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(true);
  const [templatekey, setTemplateKey] = useState("");
  const [subject, setSubject] = useState("");
  const [textEditor, setTextEditor] = useState("");

  const addUpload = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 77927b69bb144b065ca11bf2a9d452819cd852db"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      TemplateName: templatekey,
      Body: textEditor,
      Status: "Enable",
      Subject: subject,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://api.timesascent.com:8000/v1/api/apiTimes/AddEmailTemplate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          alert(result.message);
          props.onGetAllData();
          setTimeout(() => {
            props.hideModal();
          }, 600);
        } else if (
          result.status === "fail" &&
          result.status_code === 300 &&
          result.message === "data not found "
        ) {
          alert("Please fill Required fields");
        } else {
          alert("Template Name already Exists");
        }

        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
      });

    setTemplateKey("");
    setSubject("");
    setTextEditor("");
    console.log(raw);
  };
  console.log(textEditor);
  return (
    <React.Fragment>
      <Modal
        show={props.showModal}
        onHide={props.hideModal}
        backdrop={"static"}
        keyboard={false}
        size="lg"
      >
        <form
          onSubmit={(e) => {
            console.log(e);
            addUpload(e);
          }}
        >
          <div className={classes.form}>
            <input
              type="text"
              placeholder="Template Name"
              onChange={(e) => setTemplateKey(e.target.value)}
              className={classes.input1}
              value={templatekey}
            />
            <br />
            <input
              type="text"
              placeholder="Subject"
              className={classes.input1}
              onChange={(e) => setSubject(e.target.value)}
              value={subject}
            />
            <br />
            <div className={classes.textEditor}>
              <SunEditor
                onChange={(e) => {
                  setTextEditor(e);
                }}
                value={textEditor}
                setContents={textEditor}
              />
              {/* <TextEditor onChange={(e) => setBody(e)} value={body} /> */}
              {/* <textarea
                className={classes.textArea}
                name="body"
                cols="95"
                rows="10"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              /> */}
            </div>
            <br />
            <div className={classes.inputBox}>
              {/* <input type="file" id="Upload-btn" hidden /> */}
              <button
                type="submit"
                className={classes.Uploadbutton}
                htmlFor="Upload-btn"
              >
                Upload
              </button>

              <button onClick={props.hideModal} className={classes.closebutton}>
                Close
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};
export default ListModal;
