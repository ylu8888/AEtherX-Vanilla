import Model from './model.js';

window.onload = function() {

        document.querySelector('.search-form').onsubmit = (event) => {
            event.preventDefault(); // prevent page from refreshing on form submission

            document.getElementById('questions_header').innerHTML = "Search Results";

            document.getElementById('questions_header').innerHTML = "Search Results";


            let input = document.querySelector('#search-bar').value;

            if (input == '') {
                console.log('Input field is empty!'); //if the user enters nothing into search
                return;
            }

            console.log(input);
        }

        document.querySelector('#ask-btn').onclick = () => {
            showForm()
        }


        function showForm() {
            document.querySelector('.questions-box').style.display = 'none';

            document.querySelector('.question-form').style.display = 'block';

            document.querySelector('.question-form').style.display = 'flex';

        };

        //comment
};
