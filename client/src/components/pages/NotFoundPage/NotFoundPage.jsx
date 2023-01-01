import React from "react";
import "./404.css";
import * as INFORMATION from "../../../utils/constants/information.constants";
import page404image from "../../../assets/portal/404.png";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__text-block">
        <div className="not-found__number">{INFORMATION.number404}</div>
        <h1 className="not-found__title">{INFORMATION.titlePageNotFound}</h1>
        <div className="not-found__description"></div>
      </div>
      <div className="not-found__image-block">
        <div className="not-found__image404">
          <img src={page404image} alt="" />
        </div>
      </div>
    </div>
  );
}
