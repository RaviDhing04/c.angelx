import React, { useState, useEffect } from "react";
import { getNotifications } from "../../constants/constants";
import CenterModal from "../../components/CenterModal/CenterModal";
import close from "../../assets/close.svg";
import "./Notification.scss";

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [allNotification, setNotifications] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getNotifications();
      ;
      if (res) {
        setLoading(false);
        setNotifications(res);
      } else {
        (function() {setLoading(false); (alert('something went wrong, Please try again!'))} ());
      }
    }
    fetchData();
  }, []);

  const makeNotificationRow = (notification, i) => {
    return (
      <div className={i % 2 === 0 ? "evenRow" : "oddRow"}>
        <div className="type-time">
          <span className="type">Order Update</span>
          <span className="time">10 mins</span>
        </div>
        <p className="product">LG Washing Machine</p>
        <p className="status">Your order has been shipped</p>
      </div>
    );
  };

  const makeNotifications = itemCount => {
    return (
      <div className="notifications-container">
        <div className="notification-heading">
          <span>NOTIFICATIONS (08)</span>
          {modalShow ? (
            <img
              onClick={() => setModalShow(false)}
              src={close}
              alt="close"
            ></img>
          ) : null}
        </div>
        <React.Fragment>
          {allNotification.slice(0, itemCount).map((notification, index) => {
            return (
              <React.Fragment>
                {makeNotificationRow(notification, index)}
              </React.Fragment>
            );
          })}
          {allNotification.length > 4 && !modalShow ? (
            <div onClick={() => setModalShow(true)} className="viewAll">
              View All
            </div>
          ) : null}
        </React.Fragment>
      </div>
    );
  };

  return !loading ? (
    !modalShow ? (
      makeNotifications(4)
    ) : (
      <CenterModal
        component={makeNotifications(allNotification.length)}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    )
  ) : null;
};

export default Notification;
