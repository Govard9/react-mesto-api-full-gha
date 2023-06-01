import React from 'react';
import crossCircleFail from "../images/icon/icon-cross-in-a-circle-popup-fail.svg";
import crossCircleSuccess from "../images/icon/icon-cross-in-a-circle-popup-success.svg";

function InfoTooltip({
                       popupTooltipOpen,
                       registerSuccess,
                       authorizationSuccess,
                       handleCloseRegister,
                       handleCloseAuthorization
}) {

  if (popupTooltipOpen) {
    return (
      <div className={"popup popup_tooltip popup_opened"}>
        <div className="popup__main-container popup__main-container_flex-center">
          <button
            onClick={() => {

              if (registerSuccess) {
                handleCloseRegister(registerSuccess);
              } else if (registerSuccess === false) {
                handleCloseRegister(false);
              }

              if (authorizationSuccess) {
                handleCloseAuthorization(authorizationSuccess);
              } else if (authorizationSuccess === false) {
                handleCloseAuthorization(false);
              }

            }}
            className="popup__close-button"
            type="button"
            aria-label="закрыть всплывающее окно"
          ></button>
          <img
            src={authorizationSuccess ? crossCircleSuccess : registerSuccess ? crossCircleSuccess : crossCircleFail}
            alt={" Галочка в зеленом круге"}
            className="popup__cross-in-circle"
          />
          <h2 className="popup__text popup__text_cross-circle">
            {authorizationSuccess ? "Вы успешно авторизовались!" : registerSuccess ? "Вы успешно зарегиcтрировались!" : "Что-то пошло не так!\n" +
              "Попробуйте ещё раз."}
          </h2>
        </div>
      </div>
    );
  }
}

export default InfoTooltip;