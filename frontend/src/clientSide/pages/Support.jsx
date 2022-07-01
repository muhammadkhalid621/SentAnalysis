import React from "react";
import { Container } from "react-bootstrap";
import "../css/my.css";

const Support = () => {
  return (
    <Container>
      <div className="support">
        {/* < Nav1 /> */}
        <div>
          <h1 className="head">SUPPORT</h1>
          <div>
            <p className="support-text">
              <p className="subsupport-text">
                Stumbled across a problem? Not sure how to proceed? Don't worry!
                Check the FAQ's or contact us directly.
                <br />
                Our online support portals have covered you 24/7. We are always
                at hand to assist you.
              </p>
              <br />
              <h1 className="mt-2"> FAQs </h1>
              <br />
              -What are system requirements for performing all tasks?
              <br />
              Any system with an effective internet connection can avail the
              services.
              <br />
              -Are the payment credentials safe?
              <br />
              Yes, they are completely secured.
              <br />
              -How much time does it take to the operations to complete?
              <br />
              Each task takes about 4-5 minutes to complete.
              <br />
              -How will I receive the output files?
              <br />
              Essential files will be downloaded as soon as task is completed.
              They will also be emailed to you.
              <br />
              -How do I find the charges of these services?
              <br />
              Go to the Home page and click on More button to redirect to the
              plans section.
              <br />
              -How can I get in touch for any queries?
              <br />
              You can email us at ssk486@gmail.com or contact at 03363418627
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Support;
