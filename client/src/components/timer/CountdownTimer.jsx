import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import * as uiConstants from "../../utils/constants/ui.constants"
import { useCountdown } from "../../hooks/useCountdown";


const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <h5>{uiConstants.expired}</h5>
        </div>
    )
}

const ShowCounter = ({days, hours, minutes, seconds}) => {
    return (
        <div className="show-counter">
          <div className="countdown-link">
            <DateTimeDisplay value={days} type={uiConstants.days} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={uiConstants.hours} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={uiConstants.minutes} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={uiConstants.seconds} isDanger={false} />
          </div>
        </div>
      );
}

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
