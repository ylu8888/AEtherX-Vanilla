import Model from './model.js';

window.onload = function() {
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector('.search-form').onsubmit = (event) => {
            event.preventDefault(); // prevent page from refreshing on form submission

            const input = document.querySelector('#search-bar').value;

            if(input == ''){
                console.log("Empty input");
                alert("Please enter a valid search"); //if the user enters nothing into search
                return;
            }
        }

    });
};
