import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import "../css/clients.css";
import "../css/loadingUser.css";
import img1 from "../images/download.png";
import img2 from "../images/greater-than.png";
import { Table } from "react-bootstrap";
import {
  clients_list,
  download_clients,
  suspend_user,
  send_email,
} from "../actions/clients";
import { signup } from "../actions/auth";
import { connect } from "react-redux";
import AddClients from "../components/AddClients";
import PopupClients from "../components/popupClients";
import SendMail from "../components/sendMail";
const Clients = ({
  clients_list,
  send_email,
  download_clients,
  suspend_user,
  clients_suspended,
  clients_unsuspended,
  active,
  non_active,
  premium,
  signup,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEmail, setIsEmail] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [clientshow, setClientshow] = useState(false);
  const [email, setEmail] = useState();
  const [Client, setClient] = useState();

  // var d = clients_suspended.concat(clients_unsuspended);

  console.log(
    clients_suspended,
    clients_unsuspended,
    active,
    non_active,
    premium
  );
  useEffect(() => {
    clients_list();
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [clients_list, isLoading, isEmail, email]);

  const mail = (client) => {
    setIsEmail(true);
    setEmail(client);
  };
  const popup = (client) => {
    setClientshow(true);
    setClient(client);
  };
  return (
    <>
      <SideNav />
      {isLoading ? (
        <div>
          <div className="loader"></div>
        </div>
      ) : (
        <section className="content-clients">
          <div className="client-card1">
            <h4>Total Clients</h4>
            <h3>{clients_suspended.length + clients_unsuspended.length}</h3>
          </div>
          <div className="client-card2">
            <h4>Active Members</h4>
            <h3>{active}</h3>
          </div>
          <div className="client-card3">
            <h4>Premium Members</h4>
            <h3>{premium}</h3>
          </div>
          <div className="client-card4">
            <h4>Pending Requests</h4>
            <h3>{non_active}</h3>
          </div>
          <div className="client-list">
            <h1>Clients</h1>
            <button className="downloads" onClick={() => download_clients()}>
              <img src={img1} />
            </button>
            <button className="add-clients" onClick={() => setModalShow(true)}>
              Add Clients
            </button>
            {modalShow && (
              <AddClients
                show={modalShow}
                onHide={() => setModalShow(false)}
                signup={signup}
              />
            )}
            <div className="client-data">
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Clients</th>
                    <th>Gender</th>
                    <th>Date of Birth</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients_suspended.map((client, i) => (
                    <tr key={client.user_id}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="data">
                          <img src={client.image} alt="" />
                          <h3>
                            {client.username}
                            <br />
                            {client.email}
                          </h3>
                        </div>
                      </td>
                      <td>
                        <h3>{client.gender}</h3>
                      </td>
                      <td>
                        <h3>{client.dob}</h3>
                      </td>

                      <td>
                        <button className="mail" onClick={() => mail(client)}>
                          Mail
                        </button>
                        {isEmail && (
                          <SendMail
                            show={isEmail}
                            onHide={() => setIsEmail(false)}
                            send_email={send_email}
                            client_email={email}
                          />
                        )}
                        <button
                          className="suspend"
                          onClick={() => suspend_user(client)}
                          // disabled={client.suspend}
                          // value={ clients[i]['suspend'] ? "Unsuspend" : "Suspend" }
                        >
                          Suspend
                        </button>
                        <button className="btn" onClick={() => popup(client)}>
                          <img className="greater-img" src={img2} alt="" />
                        </button>
                        {clientshow && (
                          <PopupClients
                            show={clientshow}
                            onHide={() => setClientshow(false)}
                            client={Client}
                          />
                        )}
                      </td>
                    </tr>
                  ))}

                  {clients_unsuspended.map((client, i) => (
                    <tr key={client.user_id}>
                      <td>{i + 1}</td>
                      <td>
                        <div className="data">
                          <img src={client.image} alt="" />
                          <h3>
                            {client.username}
                            <br />
                            {client.email}
                          </h3>
                        </div>
                      </td>
                      <td>
                        <h3>{client.gender}</h3>
                      </td>
                      <td>
                        <h3>{client.dob}</h3>
                      </td>

                      <td>
                        <button className="mail" onClick={() => mail(client)}>
                          Mail
                        </button>
                        {isEmail && (
                          <SendMail
                            show={isEmail}
                            onHide={() => setIsEmail(false)}
                            send_email={send_email}
                            client_email={email}
                          />
                        )}
                        <button
                          className="suspend"
                          onClick={() => suspend_user(client)}
                          // disabled={client.suspend}
                          // value={ clients[i]['suspend'] ? "Unsuspend" : "Suspend" }
                        >
                          Unsuspend
                        </button>
                        <button className="btn" onClick={() => popup(client)}>
                          <img className="greater-img" src={img2} alt="" />
                        </button>
                        {clientshow && (
                          <PopupClients
                            show={clientshow}
                            onHide={() => setClientshow(false)}
                            client={Client}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  clients_suspended: state.clients.client_list_suspended,
  clients_unsuspended: state.clients.client_list_unsuspended,
  active: state.clients.active,
  non_active: state.clients.non_active,
  premium: state.clients.premium,
  //   email: state.clients.email_client,
  //   username: state.clients.username_client,
  //   gender: state.clients.gender_client,
  //   dob: state.clients.dob_client,
  //   image: state.clients.image_client,
});

export default connect(mapStateToProps, {
  clients_list,
  download_clients,
  suspend_user,
  send_email,
  signup,
})(Clients);
