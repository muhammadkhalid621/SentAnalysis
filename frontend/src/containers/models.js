// import React, { useState, useRef } from "react";
// import {
//   Form,
//   Button,
//   Dropdown,
//   DropdownButton,
//   Col,
//   Row,
// } from "react-bootstrap";
// import { file_upload } from "../actions/scrape"
// import { connect } from "react-redux"

// function Models({file_upload, username, email}) {
//   const [formData, setFormData] = useState('');
//   const [File, setFile] = useState('');

//   const { option } = formData
//   const { file } = File
//   const onChange = (e) =>
//     {
//       setFormData({ ...formData, [e.target.name]: e.target.value });

//   }

//   const changeHandler = (e) => {
//     setFile({ file: e.target.files });
//     //let files = e.target.files[0]
//     console.log(e.target.files[0])
//   }

//   const onSubmit = (e) => {
//     e.preventDefault();

//     console.log(e.target.files)
//     console.log(file);
//     file_upload(file, option, username, email)
//   };
//   return (
//     <>
//       <Form onSubmit={onSubmit}>

//         <Row>
//           <Col>
//             <Form.Group controlId="formFile">
//             <Form.Label>Choose csv File for model training</Form.Label>
//               <Form.Control
//                 name='file'
//                 type="file"
//                 accept=".xlsx, .xls, .csv"
//                 value={file || ""}
//                 onChange={(e) => changeHandler(e)}

//                 required/>
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group controlId="formBasicSelectOption">
//               <Form.Label>Select options</Form.Label>
//               <Form.Control
//                 name="option"
//                 as="select"
//                 value={option || ""}
//                 onChange={(e) => onChange(e)}
//                 required
//               >
//                 <option value="default">Select...</option>
//                 <option value="Prediction">Run Predictions</option>
//                 <option value="Train">Training the models</option>
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Button variant="primary" className="mt-3" type="submit">Submit</Button>
//       </Form>
//     </>
//   );
// }
// const mapStateToProps = (state) => ({
//     username: state.auth.username,
//     email: state.auth.email,
//   });

// export default connect(mapStateToProps,{ file_upload })(Models);

import React, { useState } from "react";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Col,
  Row,
} from "react-bootstrap";
import { file_upload } from "../actions/scrape";
import { connect } from "react-redux";
import Papa from "papaparse";

function Models({ file_upload, username, email }) {
  const [file, setFile] = useState();
  const [errors, setErrors] = useState({});
  const [option, setOptions] = useState();

  const onFile = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const findErrors = () => {
    const newErrors = {};

    //file Error
    if (!file || file === "") newErrors.file = "Username is Required";

    //option Error
    if (!option || option === "")
      newErrors.option = "Date of Birth is Required";

    return newErrors;
  };
  const submitForm = (event) => {
    event.preventDefault();
    const newErrors = findErrors();

    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      console.log(file)
      let form_data = new FormData();
      form_data.append("File", file);
      form_data.append("fileName", file.name);
      form_data.append("option", option);
      form_data.append("username", username);
      form_data.append("email", email);
      file_upload(form_data);
    }
    // console.log(file);

    var filePath = file.name;
    console.log(filePath);
    var allowedExtensions = /(\.xlsx|\.xls|\.csv|)$/i;
    if (!allowedExtensions.exec(filePath)) {
      console.log("hello");
      alert("Invalid file type");
      filePath.name = "";
      return false;
    } else {
      // Papa.parse(file, {
      //   complete: function (results) {
      //     console.log("Finished:", results.data);
      //   },
      // });
    }
  };

  return (
    <>
      <Form onSubmit={submitForm}>
        <Row>
          <Col>
            <Form.Group controlId="formFile">
              <Form.Label>Choose csv File for model training</Form.Label>
              <Form.Control
                name="File"
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={(e) => onFile(e)}
                required
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group controlId="formBasicSelectOption">
              <Form.Label>Select options</Form.Label>
              <Form.Control
                name="option"
                as="select"
                value={option || ""}
                onChange={(e) => setOptions(e.target.value)}
                required
              >
                <option value="default">Select...</option>
                <option value="Prediction">Run Predictions</option>
                <option value="Train">Training the models</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" className="mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

const mapStateToProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email,
});

export default connect(mapStateToProps, { file_upload })(Models);

// class Models extends Component {

//   state = {
//     option: null,
//     file: null,
//   }

//   handleFIle (e) {
//     let file = e.target.files[0]
//     console.log(file)
//     this.setState({file:file})
//   }

//   onChange (e) {

//     this.setState({option:e.target.value})
//   }

//   onSubmit (e) {
//     e.preventDefault();

//     console.log(this.state.file);
//     file_upload(this.state.file, this.state.option, this.props.username, this.props.email)
//   }

//   render() {
//     return (
//       <>
//         <Form onSubmit={this.onSubmit}>
//           <Row>
//             <Col>
//               <Form.Group controlId="formFile">
//                 <Form.Label>Choose csv File for model training</Form.Label>
//                 <Form.Control
//                   name="file"
//                   type="file"
//                   accept=".xlsx, .xls, .csv"
//                   value={this.state.file || ""}
//                   onChange={(e) => this.handleFIle(e)}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="formBasicSelectOption">
//                 <Form.Label>Select options</Form.Label>
//                 <Form.Control
//                   name="option"
//                   as="select"
//                   value={this.state.option || ""}
//                   onChange={(e) => this.onChange(e)}
//                   required
//                 >
//                   <option value="default">Select...</option>
//                   <option value="Prediction">Run Predictions</option>
//                   <option value="Train">Training the models</option>
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>
//           <Button variant="primary" className="mt-3" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </>
//     );
//   }

// }
// function mapStateToProps (state)  {
//   return {
//     username: state.auth.username,
//     email: state.auth.email,
// };
// };

// export default connect(mapStateToProps,{ file_upload })(Models);
