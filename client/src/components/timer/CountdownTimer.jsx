import React from "react";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "../../hooks/useCountdown";


const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Просрочен!</span>
        </div>
    )
}

const ShowCounter = ({days, hours, minutes, seconds}) => {
    return (
        <div className="show-counter">
          <div className="countdown-link">
            <DateTimeDisplay value={days} type={'дн'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'час'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'мин'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'сек'} isDanger={false} />
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
