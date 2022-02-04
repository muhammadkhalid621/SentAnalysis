import React, {useState} from "react";
import { Form, Button } from "react-bootstrap"
import { scrape_twitter } from "../actions/scrape"
import { connect } from "react-redux"

const Scrapper = ({scrape_twitter, username, email}) => {
  const [formData, setFormData] = useState({
    search_word: "",
  })

    const {search_word} = formData

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(search_word)
        scrape_twitter(search_word,username,email)
    
        
      };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-0" controlId="formGroupSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control
            name="search_word"
            //   className={`input ${errors.password && "errorShow"}`}
            type="text"
            placeholder="Enter Query"
            value={search_word || ""}
            onChange={(e) => onChange(e)}
            required
          />
          {/* {errors.password && (
                  <p className="errorShow">{errors.password}</p>
                )} */}
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            as="input"
            type="submit"
            value="Scrape"
            className="submit"
          />
        </div>
      </Form>
    </>
  );
}
const mapStateToProps = (state) => ({
  username: state.auth.username,
  email: state.auth.email,
});

export default connect(mapStateToProps,{ scrape_twitter })(Scrapper);
