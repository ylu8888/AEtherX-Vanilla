import Model from './model.js';

window.onload = function() {

    var newQuestion = new Model(); //making a new instance of model class so we can access properties

    //DISPLAYING THE QUESTIONS IN HTML
    const questList = document.querySelector(".questions-list");

    newQuestion.data.questions.forEach(question => {
        const questItem = document.createElement('li'); //create a new list item for every question

        questItem.innerHTML = `
         <h1> ${question.title}</h1>
         <p> ${question.text} </p>
         <p> ${question.tagsId} </p>
         <p> ${question.askedBy} </p>
         <p> ${question.askDate}</p>
         <p> ${question.views}</p>
         <p> ${question.ansIds}</p>
        `;

        questList.appendChild(questItem);
    })
    
    //Showing the number of questions that are asked
    document.querySelector('#num-questions').innerHTML = `${newQuestion.data.questions.length} questions`;
    
        document.querySelector('.search-form').onsubmit = (event) => {
            event.preventDefault(); // prevent page from refreshing on form submission

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

            document.querySelector('.question-form').style.display = 'flex';

        };

        document.getElementById('question-nav').addEventListener('click', myFunction);
        //comment

        //link background color
        document.getElementById('tag-nav').addEventListener('click', colorFunction);

        //we will make it so when the form is submitted, a new question is actually created as an object

        document.querySelector('.question-form').onsubmit = (event) => {

            if (document.getElementById('q-title').value.length > 100) {
                event.preventDefault();
                return;
            };
            
            //Grabbing the form input values

            var title = document.getElementById('q-title').value;
            var text =  document.getElementById('q-description').value;
            var askedBy = document.getElementById('q-username').value;
            var tags = document.getElementById('q-tags').value;

            //create a question object with the properties as the form input values
            const qObj = ({
                qid: newQuestion.data.questions.length + 1,
                title: title,
                text: text,
                tagsId: ['fakeTag'],
                askedBy, askedBy,
                askDate: new Date(),
                ansIds: ['Von Dingleberry Biggleston'],
                views: 0
            })

            //Resetting the input values from the form
            document.getElementById('q-title').value = "";
            document.getElementById('q-description').value = "";
            document.getElementById('q-username').value = "";
            document.getElementById('q-tags').value = "";


            newQuestion.data.questions.push(qObj);

            console.log(newQuestion.data);
            console.log(qObj);

            //DISPLAYING THE HTML OF THE NEWLY ASKED QUESTION
            const questItem = document.createElement('li'); //create a new list item for every question

        questItem.innerHTML = `
         <h1> ${qObj.title}</h1>
         <p> ${qObj.text} </p>
         <p> ${qObj.tagsId} </p>
         <p> ${qObj.askedBy} </p>
         <p> ${qObj.askDate}</p>
         <p> ${qObj.views}</p>
         <p> ${qObj.ansIds}</p>
        `;

        questList.appendChild(questItem);

            //get rid of the form after u submit and return to questions page
            document.querySelector('.question-form').style.display = 'none';
            document.querySelector('.questions-box').style.display = 'block';

        };
};

//this makes the form disappear
function myFunction() {

    if (document.querySelector('.question-form').style.display == 'flex') {
        document.querySelector('.question-form').style.display = 'none';
        document.querySelector('.questions-box').style.display = 'block';
    }

    if (document.getElementById('tag-nav').style.backgroundColor == 'lightgray') {
        document.getElementById('tag-nav').style.backgroundColor == 'white';
    }

    document.getElementById('question-nav').style.backgroundColor == 'lightgray'

};

function colorFunction() {
    document.getElementById('question-nav').style.backgroundColor = 'white';
    document.getElementById('tag-nav').style.backgroundColor = 'lightgray';
}