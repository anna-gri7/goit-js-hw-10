import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const findFormSnackbar = document.querySelector('form');
// const findRadio = document.querySelector('')




findFormSnackbar.addEventListener('submit', (e) => { 
    e.preventDefault();
    let success = true;
    const delay = Number(document.querySelector('[name = "delay"]').value)
    if (e.currentTarget.elements.state.value === "fulfilled") {
        success = true;
    }
    else {
        success = false;
    }

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve(delay);
            }
            else {
                reject(delay);
            }

        }, delay)
    });

promise 
    .then(value => {
        iziToast.success({
            message: value,
            messageColor: 'white',
            position: 'topRight',
            
        });})
    .catch(value => {
        iziToast.error({
            message: value,
            messageColor: 'white',
            position: 'topRight',
        });
    })

})





