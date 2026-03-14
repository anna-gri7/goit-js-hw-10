import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const findForm = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]')

startBtn.disabled = true;

let userSelectedDate

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
        iziToast.show({
          message: 'Please choose a date in the future',
          messageColor: 'white',
          position: 'topRight',
          backgroundColor: 'red',
});
              startBtn.disabled = true;
      }
      else {
          userSelectedDate = selectedDates[0];
          startBtn.disabled = false;
      }
  },
};


const f = flatpickr(findForm, options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const numbersForTimer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

startBtn.addEventListener('click', () => {
  f.set('clickOpens', false);
  startBtn.disabled = true;
  findForm.disabled = true;
  const initTime = userSelectedDate;
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = initTime - currentTime;
    const str = convertMs(diff);

    Object.keys(str).forEach(key => {
      numbersForTimer[key].textContent = addLeadingZero(str[key]);
    })

    // numbersForTimer.seconds.innerHTML = str.seconds;
    // numbersForTimer.minutes.innerHTML = str.minutes;
    // numbersForTimer.hours.innerHTML = str.hours;
    // numbersForTimer.days.innerHTML = str.days;

    if (diff < 1000) {
      clearInterval(intervalId);
      findForm.disabled = false;
      f.set('clickOpens', true);

       Object.keys(str).forEach(key => {
      numbersForTimer[key].textContent = '00';
    })
      return
    }

  }, 1000);
 
});









// const changeDays = document.querySelector('[data-days]');
// const changeHours = document.querySelector('[data-hours]');
// const changeMinutes = document.querySelector('[data-minutes]');
// const changeSeconds = document.querySelector('[data-seconds]');
