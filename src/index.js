import Model from './model.js';

window.onload = function() {

    var newQuestion = new Model(); //making a new instance of model class so we can access properties

    //DISPLAYING THE QUESTIONS IN HTML
    const questList = document.getElementById("questions-display");

    newQuestion.data.questions.forEach(question => {
        const questItem = document.createElement('li'); //create a new list item for every question

        questItem.innerHTML = `
         <h2> ${question.title}</h2>
         <p> ${question.tagsId} </p>
         <p class = "asker"> ${question.askedBy} </p>
         <p> ${question.askDate}</p>
         <p class = "q-view-data"> ${question.views}</p>
         <p class = "q-view-data"> ${question.ansIds}</p>
        `;

        questList.appendChild(questItem);
    })
    
    //Showing the number of questions that are asked
    document.querySelector('#num-questions').innerHTML = `${newQuestion.data.questions.length} questions`;

        //SEARCH BAR FORM
        document.querySelector('.search-form').onsubmit = (event) => {
            event.preventDefault(); // prevent page from refreshing on form submission

            document.getElementById('questions_header').innerHTML = "Search Results";

            var input = document.querySelector('#search-bar').value;
            

            if (input == '') {
                console.log('Input field is empty!'); //if the user enters nothing into search
                return;
            }
            
            document.querySelector('#search-bar').value = '';
            console.log(input);
            searchQuestion(input, newQuestion.data.questions);
           
            
        }

        //SEARCHING FOR A QUESTION
        function searchQuestion(inputString, questionArray){
            var search = inputString.toLowerCase(); 
            search = search.split(' '); //split each word in input String by whitespace 
            
            var resultsArray = []; //this is the questions array we will display as results
            var uniqueResults = []; //need this b/c for some reasont theres duplicates

            //CHECKING THROUGH THE QUESTION TITLE WORDS
            for(let i = 0; i < questionArray.length; i++){ //iterate through question array
                var questionWords = questionArray[i].title.split(' '); //splits the words of the question title

                for(let j = 0; j < search.length; j++){ //iterate through input strings words
                    for(let k = 0; k < questionWords.length; k++){ //iterate through question title words
                        if(questionWords[k].toLowerCase().includes(search[j])){ // at least 1 word matches
                            //we have to use include instead of == for substrings
                            resultsArray.push(questionArray[i]); //add it to the questions results we WANT to show to user
                            console.log('search success! Found a question');
                            console.log(resultsArray);
                            break; 
                            
                        }
                    }
                }
            }

            //CHECKING THROUGH THE QUESTION TEXT WORDS
            for(let i = 0; i < questionArray.length; i++){ //iterate through question array
                var questionWords = questionArray[i].text.split(' '); //splits the words of the question text

                for(let j = 0; j < search.length; j++){ //iterate through input strings words
                    for(let k = 0; k < questionWords.length; k++){ //iterate through question text words
                        if(questionWords[k].toLowerCase().includes(search[j])){ // at least 1 word matches
                            //we have to use include instead of == for substrings
                            resultsArray.push(questionArray[i]); //add it to the questions results we WANT to show to user
                            console.log('search success! Found a question');
                            console.log(resultsArray);
                            break; 
                            
                        }
                    }
                }
            }

            
            for(let i = 0; i < resultsArray.length; i++){
                if(!uniqueResults.includes(resultsArray[i])){
                    uniqueResults.push(resultsArray[i]); //only include unique results 
                }
            }

            displaySearch(uniqueResults); 
            
        }

        //DISPLAYING THE SEARCH RESULTS IN HTML

        function displaySearch(resultsArray){
            document.querySelector('#num-questions').innerHTML = `${resultsArray.length} questions`;

            while(questList.firstChild != null){
                questList.removeChild(questList.firstChild); //remove every list item from question list
            }

            resultsArray.forEach(question => {
                const questItem = document.createElement('li'); //create a new list item for every question

                questItem.innerHTML = `
                <h2> ${question.title}</h2>
                <p> ${question.tagsId} </p>
                <p class = "asker"> ${question.askedBy} </p>
                <p> ${question.askDate}</p>
                <p class = "q-view-data"> ${question.views}</p>
                <p class = "q-view-data"> ${question.ansIds}</p>
                `;

                questList.appendChild(questItem);
            })

            
            
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

        //ADD QUESTION FORM
        document.querySelector('.question-form').onsubmit = (event) => {
            
            //we have to delete every list item from questions List
            while(questList.firstChild != null){
                questList.removeChild(questList.firstChild); //remove every list item from question list
            }
            //and then re-add it because of how the search functionality is implemented
            newQuestion.data.questions.forEach(question => {
                const questItem = document.createElement('li'); //create a new list item for every question
        
                questItem.innerHTML = `
                 <h2> ${question.title}</h2>
                 <p> ${question.tagsId} </p>
                 <p class = "asker"> ${question.askedBy} </p>
                 <p> ${question.askDate}</p>
                 <p class = "q-view-data"> ${question.views}</p>
                 <p class = "q-view-data"> ${question.ansIds}</p>
                `;
        
                questList.appendChild(questItem);
            })
            
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
         <h2> ${qObj.title}</h2>
         <p> ${qObj.tagsId} </p>
         <p class = "asker"> ${qObj.askedBy} </p>
         <p> ${qObj.askDate}</p>
         <p class = "q-view-data"> ${qObj.views}</p>
         <p class = "q-view-data"> ${qObj.ansIds}</p>
        `;

        questList.appendChild(questItem); //add the list item onto question list

        document.querySelector('#num-questions').innerHTML = `${newQuestion.data.questions.length} questions`;
        document.getElementById('questions_header').innerHTML = "All Questions";

            //get rid of the form after u submit and return to questions page
            document.querySelector('.question-form').style.display = 'none';
            document.querySelector('.questions-box').style.display = 'block';

            document.querySelector('#num-questions').innerHTML = `${newQuestion.data.questions.length} questions`;

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
