import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import classes from "./EditFormModal.module.css";
import TextEditor from "./TextEditor";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const EditFormModal = (props) => {
  const [templateName, setTemplateName] = useState();
  const [subject, setSubject] = useState("");
  // const [body, setBody] = useState("");
  const [tableId, setTableId] = useState("");
  const [textEditor, setTextEditor] = useState("");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 77927b69bb144b065ca11bf2a9d452819cd852db"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      TemplateId: props.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://api.onecorp.co.in:8000/v1/api/apiTimes/GetEmailTemplateId",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setTemplateName(result.data.TemplateName);
        setSubject(result.data.Subject);
        setTextEditor(result.data.Body);
        setTableId(result.data.Id);
      })
      .catch((error) => console.log("error", error));
  };

  const UpdateEmailtemplate = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Token 77927b69bb144b065ca11bf2a9d452819cd852db"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      TemplateName: templateName,
      Body: textEditor,
      Status: "Enable",
      Subject: subject,
      Template_Id: tableId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(
      "http://api.onecorp.co.in:8001/v1/api/apiTimes/UpdateEmailtemplate",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "SUCCESS" && result.status_code === 200) {
          props.onGetAllData();
          alert("Data Updated Successfully");
        }
        //  else if (result.status === "fail" && result.status_code === 300) {
        //   alert(result.message);
        // }
        console.log(result);
      })
      .catch((error) => {
        console.log("error", error);
      });

    setTemplateName("");
    setSubject("");
    setTextEditor("");
    setTableId("");
    setTimeout(() => {
      props.hideformModal();
    }, 600);
  };

  // const onBodyChangeHandler = (textEditorValue) => {
  //   setBody(textEditorValue);
  // };

  console.log(textEditor);
  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={props.showformModal}
        onHide={props.hideformModal}
        backdrop={"static"}
        keyboard={false}
      >
        <>
          <form
            className={classes.form}
            onSubmit={(e) => {
              UpdateEmailtemplate(e);
            }}
          >
            <input
              type="text"
              placeholder="Template Key"
              className={classes.input1}
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
              }}
            />
            <br />
            <input
              type="text"
              placeholder="Subject"
              className={classes.input1}
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
            <br />
            <div className={classes.textEditor}>
              <SunEditor
                onChange={(e) => {
                  setTextEditor(e);
                }}
                // value={textEditor}
                setContents={textEditor}
                // defaultValue={textEditor}
              />
            </div>

            {/* <textarea
              className={classes.textArea}
              name=""
              id=""
              cols="90"
              rows="10"
              value={body}
              // onChange={onBodyChangeHandler}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></textarea> */}
            <br />
            <div className={classes.inputBox}>
              {/* <input type="file" id="actual-btn" hidden /> */}
              <button htmlFor="actual-btn" className={classes.Uploadbutton}>
                Save
              </button>
              <button
                type="submit"
                className={classes.closebutton}
                onClick={props.hideformModal}
              >
                Close
              </button>
            </div>
          </form>
        </>
      </Modal>
    </React.Fragment>
  );
};
export default EditFormModal;
