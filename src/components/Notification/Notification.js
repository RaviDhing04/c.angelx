import React, { useState, useEffect } from "react";
import { getNotifications } from "../../constants/constants";
import CenterModal from "../../components/CenterModal/CenterModal";
import close from "../../assets/close.svg";
import "./Notification.scss";

const Notification = (props) => {
  const [loading, setLoading] = useState(false);
  const [allNotification, setNotifications] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (props.data && props.data.length) {
      setNotifications(props.data);
    }
  }, [props]);

  const makeNotificationRow = (notification, i) => {
    return (
      <div className={i % 2 === 0 ? "evenRow" : "oddRow"}>
        <div className="type-time">
          <span className="type">{notification.NotificationType.S}</span>
          <span className="time">5 mins</span>
        </div>
        <p className="product">{notification.Message.S}</p>
        <p className="status">{notification.Message1.S}</p>
      </div>
    );
  };

  const makeNotifications = itemCount => {
    return (
      <div className="notifications-container">
        <div className="notification-heading">
          <span>NOTIFICATIONS ({allNotification.length})</span>
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
          size="lg"
        />
      )
  ) : null;
};

export default Notification;
