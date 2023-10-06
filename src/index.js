import Model from './model.js';

var newQuestion = new Model(); //making a new instance of model class so we can access properties

window.onload = function() {

    //DISPLAYING THE QUESTIONS IN HTML
    document.getElementById('newest-button').click();

    const questList = document.getElementById("questions-display");

    newQuestion.data.questions.forEach(question => {
        const questItem = document.createElement('li'); //create a new list item for every question
        questItem.style.display = 'flex';
        questItem.style.justifyContent = 'space-between';

        questItem.innerHTML = `

        <div class = "view_data" style = "padding: 5px">
            <p class = "q-view-data"> Views: ${question.views}</p>
            <p class = "q-view-data"> ${question.ansIds.length} answers</p>
        </div>  `;

        var headingDiv = document.createElement('div');
        headingDiv.style.padding = "5px";
        headingDiv.style.textAlign = "center";
        headingDiv.className = 'view_heading';

        headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${question.title}</h3>`;

        for (let j = 0; j < question.tagIds.length; j++) {

            for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {

                if (question.tagIds[j] == newQuestion.data.tags[j2].tid) {

                    var newP = document.createElement('p');
                    newP.style.display = 'inline-block';
                    newP.textContent = `${newQuestion.data.tags[j2].name}`;
                    newP.style.padding = "5px";
                    newP.style.margin = "3px";
                    newP.style.marginLeft = "3px";
                    newP.style.marginRight = "3px";
                    newP.style.backgroundColor = "#585858";
                    newP.style.color = "white";
                    newP.style.borderRadius = "3px";
                    newP.style.border = "1px solid black";
                    headingDiv.appendChild(newP);

                }

            }

        }

        questItem.appendChild(headingDiv);

        var currentTime = new Date();

        var timeDifference = currentTime - question.askDate;
        var timeDifferenceMinutes = timeDifference/(1000 * 60);
        var timeDifferenceHours = timeDifference/(1000 * 60 *60);
        var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

        var timeDiv = document.createElement('div');
        timeDiv.style.padding = "5px";
        timeDiv.className = "view_time";

        if (timeDifferenceMinutes < 1) {

            timeDiv.innerHTML = `
            <p class = "asker"> ${question.askedBy} </p>
            <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
            `;

        } else if (timeDifferenceMinutes < 60) {

            timeDiv.innerHTML = `
            <p class = "asker"> ${question.askedBy} </p>
            <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
            `;
            
        } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

            timeDiv.innerHTML = `
            <p class = "asker"> ${question.askedBy} </p>
            <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
            `;

        } else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

            var monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ];

              var dayHours = 0;

              if (question.askDate.getHours() > 12) {
                  dayHours = question.askDate.getHours() - 12;
              } else {
                  dayHours = question.askDate.getHours();
              }

            
            if (question.askDate.getMinutes() < 10) {
                timeDiv.innerHTML = `
                <p class = "asker"> ${question.askedBy} </p>
                <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                `;
            } else {
                timeDiv.innerHTML = `
                <p class = "asker"> ${question.askedBy} </p>
                <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                `;
            }

        } else if (timeDifferenceYears > 1) {

            var monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ];

              var dayHours = 0;

              if (question.askDate.getHours() > 12) {
                  dayHours = question.askDate.getHours() - 12;
              } else {
                  dayHours = question.askDate.getHours();
              }

            
            if (question.askDate.getMinutes() < 10) {
                timeDiv.innerHTML = `
                <p class = "asker"> ${question.askedBy} </p>
                <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                `;
            } else {
                timeDiv.innerHTML = `
                <p class = "asker"> ${question.askedBy} </p>
                <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                `;
            }

        }

        questItem.appendChild(timeDiv);

        questList.appendChild(questItem); //add the list item onto question list

        questItem.querySelector('.questTit').addEventListener('click', () => headerClick(question));

    
        // var questTitles = document.getElementsByClassName('questTit');

        // for (let j = 0; j < questTitles.length; j++) {
        //     questTitles[j].addEventListener('click', () => headerClick(newQuestion.data.questions[j]));
        // };

    })

    //Showing the number of questions that are asked
    document.querySelector('#num-questions').innerHTML = `${newQuestion.data.questions.length} questions`;

        //SEARCH BAR FORM
        document.querySelector('.search-form').onsubmit = (event) => {
            event.preventDefault(); // prevent page from refreshing on form submission

            document.getElementById('questions_header').innerHTML = "Search Results";

            document.querySelector('.noresults').style.display = 'none';

            //change nav colors
            document.querySelector('#question-nav').style.backgroundColor = 'lightgray';
            document.querySelector('#tag-nav').style.backgroundColor = 'white';


            var input = document.querySelector('#search-bar').value;
            

            if (input == '') {
                console.log('Input field is empty!'); //if the user enters nothing into search
                while(questList.firstChild != null){
                    questList.removeChild(questList.firstChild); //remove every list item from question list
                }
                document.querySelector('.noresults').style.display = 'block';
                document.querySelector('#num-questions').innerHTML = '0 questions';
                return;
            }
            
            document.querySelector('#search-bar').value = '';
            console.log(input);
            searchQuestion(input, newQuestion.data.questions, newQuestion.data.tags);
           
            
        }

        //SEARCHING FOR A QUESTION
        function searchQuestion(inputString, questionArray, tagsArray){
            var search = inputString.toLowerCase(); 
            search = search.split(' '); //split each word in input String by whitespace 
            
            var resultsArray = []; //this is the questions array we will display as results
            var uniqueResults = []; //need this b/c for some reasont theres duplicates

            //HIDING EVERY PAGE
            document.querySelector('.tag-page').style.display ='none';
            document.querySelector('.questions-box').style.display = 'block';
            document.querySelector('.question-form').style.display = 'none';
            document.querySelector('.question-details').style.display = 'none';
            document.querySelector('.answer-form').style.display = 'none';

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

            //TAG START
            var tag_search = inputString.toLowerCase();

            //takes out spaces
            const tag_search_array = tag_search.split(' ');
            console.log("this the array after splitting spaces:" + tag_search_array);

            const actualTags = []
            const otherWords = [];

            //gets the tag names
            for (let j = 0; j < tag_search_array.length; j++) {

                //if there are brackets, delimit the string into a new string without brackets
                //if they meet this criteria then we put it into the actualTags array
                if ((tag_search_array[j].includes('[')) && (tag_search_array[j].includes(']'))) {

                    let tagString = tag_search_array[j].replace(/\[|\]/g, '');
                    console.log('tagString:'+ tagString);
                    actualTags.push(tagString);

                } else {
                    //otherwise we put it into the otherwords array
                    otherWords.push(tag_search_array[j]);

                }

            }

            if (actualTags.length != 0) {

                //this will hold any complete matches we find

                //now we will look through the question for matches in these both
                for (let j = 0; j < questionArray.length; j++) {
                    //some variable to check whether all the words in the search are included in this questions tags list
                    var allMatch = 0

                    //start by going through the words in the input
                    for (let k = 0; k < actualTags.length; k++) {

                        //we need to look for this questions tids within the tag objects
                        const searchTags = [];

                        for (let z = 0; z < questionArray[j].tagIds.length; z++) {

                            //looks for them in the tag object array and pushes the tag names into searchTags
                            for (let z2 = 0; z2 < tagsArray.length; z2++) {

                                if (tagsArray[z2].tid == questionArray[j].tagIds[z]) {
                                    console.log("hey they matched");
                                    searchTags.push(tagsArray[z2].name);
                                }

                            }

                        }

                        console.log(searchTags);


                        //then we check to see if it is in this quesions tagsid array
                        //if so we increment allMatch, and at the end, we see check if it has
                        //if it is zero, we go to the next word
                        for (let k2 = 0; k2 < searchTags.length; k2++) {

                            console.log(searchTags[k2].includes(actualTags[k]));

                            if (searchTags[k2].includes(actualTags[k])) {
                                allMatch += 1;
                                break;
                            } else {
                                continue;
                            }

                        }

                    }

                    console.log("Here are the ones the I found:" + allMatch);

                    //this means the tags for this question do not match the input tags at all
                    if (allMatch == 0) {
                        continue;
                    }

                    //if there are no other words other than the tags, then push it
                    if (otherWords.length == 0) {
                        uniqueResults.push(questionArray[j]);
                    } else {

                        //now we will check for title matches and body matches
                        var thisTitle = questionArray[j].title.toLowerCase();

                        var thisBody = questionArray[j].text.toLowerCase();

                        var foundAny = 0;

                        for (let m = 0; m < otherWords.length; m++) {

                            //if the title matches, push and break, else if the body does, also push and break
                            if (thisTitle.includes(otherWords[m])) {
                                uniqueResults.push(questionArray[j]);
                                foundAny = 1;
                                break;
                            } else if (thisBody.includes(otherWords[m])) {
                                uniqueResults.push(questionArray[j]);
                                foundAny = 1;
                                break;
                            }

                        }

                        if (foundAny == 0) {
                            uniqueResults.push(questionArray[j]);
                        }

                    }

                }

                console.log(uniqueResults);

                console.log("This is the length of uniqueResults:" + uniqueResults.length);

                //now we call the diplay search on this
                displaySearch(uniqueResults);

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

            if(uniqueResults.length == 0){
                document.querySelector('.noresults').style.display = 'block';
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
                questItem.style.display = 'flex';
                questItem.style.justifyContent = 'space-between';

                questItem.innerHTML = `

                <div class = "view_data" style = "padding: 5px">
                    <p class = "q-view-data"> Views: ${question.views}</p>
                    <p class = "q-view-data"> ${question.ansIds.length} answers</p>
                </div>  `;
    
                var headingDiv = document.createElement('div');
                headingDiv.style.padding = "5px";
                headingDiv.style.textAlign = "center";
                headingDiv.className = 'view_heading';
    
                headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${question.title}</h3>`;
    
                for (let j = 0; j < question.tagIds.length; j++) {
    
                    for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {
    
                        if (question.tagIds[j] == newQuestion.data.tags[j2].tid) {
    
                            var newP = document.createElement('p');
                            newP.style.display = 'inline-block';
                            newP.textContent = `${newQuestion.data.tags[j2].name}`;
                            newP.style.padding = "5px";
                            newP.style.margin = "3px";
                            newP.style.marginLeft = "3px";
                            newP.style.marginRight = "3px";
                            newP.style.backgroundColor = "#585858";
                            newP.style.color = "white";
                            newP.style.borderRadius = "3px";
                            newP.style.border = "1px solid black";
                            headingDiv.appendChild(newP);
    
                        }
    
                    }
    
                }
    
                questItem.appendChild(headingDiv);
    
                var currentTime = new Date();

                var timeDifference = currentTime - question.askDate;
                var timeDifferenceMinutes = timeDifference/(1000 * 60);
                var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
                var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

                var timeDiv = document.createElement('div');
                timeDiv.style.padding = "5px";
                timeDiv.className = "view_time";

                if (timeDifferenceMinutes < 1) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
                    `;

                } else if (timeDifferenceMinutes < 60) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
                    `;
                    
                } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
                    `;

                }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];

                      var dayHours = 0;

                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }

                    
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                } else if (timeDifferenceYears > 1) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
        
                      var dayHours = 0;
        
                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }
        
                    
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                }
    
                questItem.appendChild(timeDiv);
    
                questList.appendChild(questItem); //add the list item onto question list


                questItem.querySelector('.questTit').addEventListener('click', () => headerClick(question));

                // var questTitles = document.getElementsByClassName('questTit');

                // for (let j = 0; j < questTitles.length; j++) {
                //     questTitles[j].addEventListener('click', () => headerClick(newQuestion.data.questions[j]));
                // };
            })

            
        }

        //SHOWING THE QUESTION FORM
        document.querySelectorAll('.ask-btn').forEach(button => {
            button.onclick = () => {
                showForm()
            }
        })
      

        function showForm() {
            document.querySelector('.questions-box').style.display = 'none';

            document.querySelector('.question-form').style.display = 'flex';

            document.querySelector('.question-details').style.display = 'none';

            document.querySelector('.tag-page').style.display = 'none';

        };

        //NAV BAR REDIRECTION
        document.getElementById('question-nav').addEventListener('click', myFunction);
        document.getElementById('tag-nav').addEventListener('click', showTags);
        

        //link background color
        document.getElementById('tag-nav').addEventListener('click', colorFunction);

        //newest sort button
        document.getElementById('newest-button').onclick = () => {

            console.log("newest button onclick worked");

            //array to store all of the questions
            var questionSort = [];

            for (let j = 0; j < newQuestion.data.questions.length; j++) {
                questionSort.push(newQuestion.data.questions[j]);
            }

            //sort functon applied to each element in the questions array
            //b - a makes it so its sorted in descending order, whereas a - b would sort it in ascending order
            questionSort.sort(function(a, b) {
                console.log("this is a's data:" + a.askDate);
                console.log("this is b' date:" + b.askDate);
                return b.askDate - a.askDate;
            })

            //clearing out the previous stuff and putting in the sorted in the sorted information
            while (questList.firstChild != null) {
                questList.removeChild(questList.firstChild);
            }

            document.querySelector('#num-questions').innerHTML = `${questionSort.length} questions`;

            questionSort.forEach(question => {

                const questItem = document.createElement('li');
                questItem.style.display = 'flex';
                questItem.style.justifyContent = 'space-between';

                questItem.innerHTML = `

                <div class = "view_data" style = "padding: 5px">
                    <p class = "q-view-data"> Views: ${question.views}</p>
                    <p class = "q-view-data"> ${question.ansIds.length} answers</p>
                </div>  `;
    
                var headingDiv = document.createElement('div');
                headingDiv.style.padding = "5px";
                headingDiv.style.textAlign = "center";
                headingDiv.className = 'view_heading';
    
                headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${question.title}</h3>`;
    
                for (let j = 0; j < question.tagIds.length; j++) {
    
                    for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {
    
                        if (question.tagIds[j] == newQuestion.data.tags[j2].tid) {
    
                            var newP = document.createElement('p');
                            newP.style.display = 'inline-block';
                            newP.textContent = `${newQuestion.data.tags[j2].name}`;
                            newP.style.padding = "5px";
                            newP.style.margin = "3px";
                            newP.style.marginLeft = "3px";
                            newP.style.marginRight = "3px";
                            newP.style.backgroundColor = "#585858";
                            newP.style.color = "white";
                            newP.style.borderRadius = "3px";
                            newP.style.border = "1px solid black";
                            headingDiv.appendChild(newP);
    
                        }
    
                    }
    
                }
    
                questItem.appendChild(headingDiv);
    
                var currentTime = new Date();

                var timeDifference = currentTime - question.askDate;
                var timeDifferenceMinutes = timeDifference/(1000 * 60);
                var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
                var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

                var timeDiv = document.createElement('div');
                timeDiv.style.padding = "5px";
                timeDiv.className = "view_time";

                if (timeDifferenceMinutes < 1) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
                    `;

                } else if (timeDifferenceMinutes < 60) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
                    `;
                    
                } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
                    `;

                }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];

                      var dayHours = 0;

                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }

                      
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                } else if (timeDifferenceYears > 1) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
        
                      var dayHours = 0;
        
                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }
        
                    
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                }
    
                questItem.appendChild(timeDiv);
    
                questList.appendChild(questItem); //add the list item onto question list

                questItem.querySelector('.questTit').addEventListener('click', () => headerClick(question));

                // var questTitles = document.getElementsByClassName('questTit');

                // for (let j = 0; j < questTitles.length; j++) {
                //     questTitles[j].addEventListener('click', () => headerClick(newQuestion.data.questions[j]));
                // };

            })

        };

        //unaswered button clicked
        document.getElementById('unanswered-button').onclick = () => {

            console.log('unanswered onclick is working');

            var unanswered = []

            //gets all the questions with the ansId length as 0
            for (let j = 0; j < newQuestion.data.questions.length; j++) {

                if (newQuestion.data.questions[j].ansIds.length == 0) {
                    unanswered.push(newQuestion.data.questions[j]);
                }

            }

            while (questList.firstChild != null) {
                questList.removeChild(questList.firstChild);
            }

            document.querySelector('#num-questions').innerHTML = `${unanswered.length} questions`;

            unanswered.forEach(question => {

                const questItem = document.createElement('li');
                questItem.style.display = 'flex';
                questItem.style.justifyContent = 'space-between';

                questItem.innerHTML = `

                <div class = "view_data" style = "padding: 5px">
                    <p class = "q-view-data"> Views: ${question.views}</p>
                    <p class = "q-view-data"> ${question.ansIds.length} answers</p>
                </div>  `;
    
                var headingDiv = document.createElement('div');
                headingDiv.style.padding = "5px";
                headingDiv.style.textAlign = "center";
                headingDiv.className = 'view_heading';
    
                headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${question.title}</h3>`;
    
                for (let j = 0; j < question.tagIds.length; j++) {
    
                    for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {
    
                        if (question.tagIds[j] == newQuestion.data.tags[j2].tid) {
    
                            var newP = document.createElement('p');
                            newP.style.display = 'inline-block';
                            newP.textContent = `${newQuestion.data.tags[j2].name}`;
                            newP.style.padding = "5px";
                            newP.style.margin = "3px";
                            newP.style.marginLeft = "3px";
                            newP.style.marginRight = "3px";
                            newP.style.backgroundColor = "#585858";
                            newP.style.color = "white";
                            newP.style.borderRadius = "3px";
                            newP.style.border = "1px solid black";
                            headingDiv.appendChild(newP);
    
                        }
    
                    }
    
                }
    
                questItem.appendChild(headingDiv);

                var currentTime = new Date();

                var timeDifference = currentTime - question.askDate;
                var timeDifferenceMinutes = timeDifference/(1000 * 60);
                var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
                var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

                var timeDiv = document.createElement('div');
                timeDiv.style.padding = "5px";
                timeDiv.className = "view_time";

                if (timeDifferenceMinutes < 1) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
                    `;

                } else if (timeDifferenceMinutes < 60) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
                    `;
                    
                } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
                    `;

                }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];

                      var dayHours = 0;

                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }

                      
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                } else if (timeDifferenceYears > 1) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
        
                      var dayHours = 0;
        
                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }
        
                    
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                }
    
                questItem.appendChild(timeDiv);
    
                questList.appendChild(questItem); //add the list item onto question list

                questItem.querySelector('.questTit').addEventListener('click', () => headerClick(question));
                // var questTitles = document.getElementsByClassName('questTit');

                // for (let j = 0; j < questTitles.length; j++) {
                //     questTitles[j].addEventListener('click', () => headerClick(newQuestion.data.questions[j]));
                // };

            })

        }

        //active button onclick
        document.getElementById('active-button').onclick = () => {

            console.log('answer button onclick is working');

            const answeredQuestions = []
            const unansweredQuestions = [];

            for (let j = 0; j < newQuestion.data.questions.length; j++) {

                if (newQuestion.data.questions[j].ansIds.length != 0) {
                    answeredQuestions.push(newQuestion.data.questions[j]);
                } else {
                    unansweredQuestions.push(newQuestion.data.questions[j]);
                }

            }
            
            console.log(unansweredQuestions)

            //now we should go ahead and find the most recent answers within each question
            const latestAnswers = [];

            for (let k = 0; k < answeredQuestions.length; k++) {

                //gets the last, most latest ansId within this questions ansids
                var this_latest = answeredQuestions[k].ansIds[answeredQuestions[k].ansIds.length - 1];

                for (let z = 0; z < newQuestion.data.answers.length; z++) {

                    if (newQuestion.data.answers[z].aid == this_latest) {
                        latestAnswers.push(newQuestion.data.answers[z]);
                        break;
                    }

                }

            }

            //now we sort by descending date
            const sortedlatest = latestAnswers.sort(function(a, b) {
                return b.ansDate - a.ansDate;
            })

            console.log(sortedlatest);

            //now we go and find the questions which have these sorted answers in their ansIds
            const sortedQuestions = [];

            for (let j = 0; j < sortedlatest.length; j++) {

                for (let j2 = 0; j2 < answeredQuestions.length; j2++) {

                    if (answeredQuestions[j2].ansIds.includes(sortedlatest[j].aid)) {
                        sortedQuestions.push(answeredQuestions[j2]);
                        console.log(answeredQuestions[j2]);
                        break;
                    }

                }

                console.log(sortedlatest[j]);

            }

            console.log(sortedQuestions)

            while (questList.firstChild != null) {
                questList.removeChild(questList.firstChild);
            }

            //now we just show them
            sortedQuestions.forEach(question => {

                const questItem = document.createElement('li');
                questItem.style.display = 'flex';
                questItem.style.justifyContent = 'space-between';

                questItem.innerHTML = `

                <div class = "view_data" style = "padding: 5px">
                    <p class = "q-view-data"> Views: ${question.views}</p>
                    <p class = "q-view-data"> ${question.ansIds.length} answers</p>
                </div>  `;
    
                var headingDiv = document.createElement('div');
                headingDiv.style.padding = "5px";
                headingDiv.style.textAlign = "center";
                headingDiv.className = 'view_heading';
    
                headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${question.title}</h3>`;
    
                for (let j = 0; j < question.tagIds.length; j++) {
    
                    for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {
    
                        if (question.tagIds[j] == newQuestion.data.tags[j2].tid) {
    
                            var newP = document.createElement('p');
                            newP.style.display = 'inline-block';
                            newP.textContent = `${newQuestion.data.tags[j2].name}`;
                            newP.style.padding = "5px";
                            newP.style.margin = "3px";
                            newP.style.marginLeft = "3px";
                            newP.style.marginRight = "3px";
                            newP.style.backgroundColor = "#585858";
                            newP.style.color = "white";
                            newP.style.borderRadius = "3px";
                            newP.style.border = "1px solid black";
                            headingDiv.appendChild(newP);
    
                        }
    
                    }
    
                }
    
                questItem.appendChild(headingDiv);
    
                var currentTime = new Date();

                var timeDifference = currentTime - question.askDate;
                var timeDifferenceMinutes = timeDifference/(1000 * 60);
                var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
                var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

                var timeDiv = document.createElement('div');
                timeDiv.style.padding = "5px";
                timeDiv.className = "view_time";

                if (timeDifferenceMinutes < 1) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
                    `;

                } else if (timeDifferenceMinutes < 60) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
                    `;
                    
                } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
                    `;

                }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];

                      var dayHours = 0;

                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }

                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                } else if (timeDifferenceYears > 1) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
        
                      var dayHours = 0;
        
                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }
        
                    
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                }

                questItem.appendChild(timeDiv);
    
                questList.appendChild(questItem); //add the list item onto question list


                questItem.querySelector('.questTit').addEventListener('click', () => headerClick(question));

            })

            if (unansweredQuestions.length != 0) {

                const sortedUnanswered = unansweredQuestions.sort(function(a, b) {
                    return b.askDate - a.askDate;
                })

                sortedUnanswered.forEach(question => {

                    const questItem = document.createElement('li');
                    questItem.style.display = 'flex';
                    questItem.style.justifyContent = 'space-between';
    
                    questItem.innerHTML = `

                    <div class = "view_data" style = "padding: 5px">
                        <p class = "q-view-data"> Views: ${question.views}</p>
                        <p class = "q-view-data"> ${question.ansIds.length} answers</p>
                    </div>  `;
        
                    var headingDiv = document.createElement('div');
                    headingDiv.style.padding = "5px";
                    headingDiv.style.textAlign = "center";
                    headingDiv.className = 'view_heading';
        
                    headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${question.title}</h3>`;
        
                    for (let j = 0; j < question.tagIds.length; j++) {
        
                        for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {
        
                            if (question.tagIds[j] == newQuestion.data.tags[j2].tid) {
        
                                var newP = document.createElement('p');
                                newP.style.display = 'inline-block';
                                newP.textContent = `${newQuestion.data.tags[j2].name}`;
                                newP.style.padding = "5px";
                                newP.style.margin = "3px";
                                newP.style.marginLeft = "3px";
                                newP.style.marginRight = "3px";
                                newP.style.backgroundColor = "#585858";
                                newP.style.color = "white";
                                newP.style.borderRadius = "3px";
                                newP.style.border = "1px solid black";
                                headingDiv.appendChild(newP);
        
                            }
        
                        }
        
                    }
        
                    questItem.appendChild(headingDiv);
        
                    var currentTime = new Date();

                    var timeDifference = currentTime - question.askDate;
                    var timeDifferenceMinutes = timeDifference/(1000 * 60);
                    var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
                    var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);
    
                    var timeDiv = document.createElement('div');
                    timeDiv.style.padding = "5px";
                    timeDiv.className = "view_time";
    
                    if (timeDifferenceMinutes < 1) {
    
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
                        `;
    
                    } else if (timeDifferenceMinutes < 60) {
    
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
                        `;
                        
                    } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {
    
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
                        `;
    
                    }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

                        var monthNames = [
                            'January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'
                          ];

                          var dayHours = 0;

                          if (question.askDate.getHours() > 12) {
                              dayHours = question.askDate.getHours() - 12;
                          } else {
                              dayHours = question.askDate.getHours();
                          }

                        if (question.askDate.getMinutes() < 10) {
                            timeDiv.innerHTML = `
                            <p class = "asker"> ${question.askedBy} </p>
                            <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                            `;
                        } else {
                            timeDiv.innerHTML = `
                            <p class = "asker"> ${question.askedBy} </p>
                            <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                            `;
                        }
            
                    } else if (timeDifferenceYears > 1) {

                        var monthNames = [
                            'January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'
                          ];
            
                          var dayHours = 0;
            
                          if (question.askDate.getHours() > 12) {
                              dayHours = question.askDate.getHours() - 12;
                          } else {
                              dayHours = question.askDate.getHours();
                          }
            
                        
                        if (question.askDate.getMinutes() < 10) {
                            timeDiv.innerHTML = `
                            <p class = "asker"> ${question.askedBy} </p>
                            <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                            `;
                        } else {
                            timeDiv.innerHTML = `
                            <p class = "asker"> ${question.askedBy} </p>
                            <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                            `;
                        }
            
                    }
        
                    questItem.appendChild(timeDiv);
        
                    questList.appendChild(questItem); //add the list item onto question list
    
                    questItem.querySelector('.questTit').addEventListener('click', () => headerClick(question));
    
                })

            }

        }

        //we will make it so when the form is submitted, a new question is actually created as an object

        //ADD QUESTION FORM
        document.querySelector('.question-form').onsubmit = (event) => {
            event.preventDefault();
            
            //console.log('is this submitting properly');

            document.querySelector('#question-nav').style.backgroundColor = 'lightgray';
            document.querySelector('#tag-nav').style.backgroundColor = 'white';
            document.querySelector('.error-message').style.display = 'none'; //error messages
            document.querySelector('#tag-error').style.display = 'none';
            document.querySelector('#max-tags').style.display = 'none';


            //we have to delete every list item from questions List
            while(questList.firstChild != null){
                questList.removeChild(questList.firstChild); //remove every list item from question list
            }
            //and then re-add it because of how the search functionality is implemented
            newQuestion.data.questions.forEach(question => {
                const questItem = document.createElement('li'); //create a new list item for every question
                questItem.style.display = 'flex';
                questItem.style.justifyContent = 'space-between'; 

                questItem.innerHTML = `

                <div class = "view_data" style = "padding: 5px">
                    <p class = "q-view-data"> Views: ${question.views}</p>
                    <p class = "q-view-data"> ${question.ansIds.length} answers</p>
                </div>  `;
    
                var headingDiv = document.createElement('div');
                headingDiv.style.padding = "5px";
                headingDiv.style.textAlign = "center";
                headingDiv.className = 'view_heading';
    
                headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${question.title}</h3>`;
    
                for (let j = 0; j < question.tagIds.length; j++) {
    
                    for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {
    
                        if (question.tagIds[j] == newQuestion.data.tags[j2].tid) {
    
                            var newP = document.createElement('p');
                            newP.style.display = 'inline-block';
                            newP.textContent = `${newQuestion.data.tags[j2].name}`;
                            newP.style.padding = "5px";
                            newP.style.margin = "3px";
                            newP.style.marginLeft = "3px";
                            newP.style.marginRight = "3px";
                            newP.style.backgroundColor = "#585858";
                            newP.style.color = "white";
                            newP.style.borderRadius = "3px";
                            newP.style.border = "1px solid black";
                            headingDiv.appendChild(newP);
    
                        }
    
                    }
    
                }
    
                questItem.appendChild(headingDiv);
    
                var currentTime = new Date();

                var timeDifference = currentTime - question.askDate;
                var timeDifferenceMinutes = timeDifference/(1000 * 60);
                var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
                var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

                var timeDiv = document.createElement('div');
                timeDiv.style.padding = "5px";
                timeDiv.className = "view_time";

                if (timeDifferenceMinutes < 1) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
                    `;

                } else if (timeDifferenceMinutes < 60) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
                    `;
                    
                } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
                    `;

                }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];

                      var dayHours = 0;

                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }

                      
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                } else if (timeDifferenceYears > 1) {

                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
        
                      var dayHours = 0;
        
                      if (question.askDate.getHours() > 12) {
                          dayHours = question.askDate.getHours() - 12;
                      } else {
                          dayHours = question.askDate.getHours();
                      }
        
                    
                    if (question.askDate.getMinutes() < 10) {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                        `;
                    } else {
                        timeDiv.innerHTML = `
                        <p class = "asker"> ${question.askedBy} </p>
                        <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                        `;
                    }
        
                }
    
                questItem.appendChild(timeDiv);
    
                questList.appendChild(questItem); //add the list item onto question list


                questItem.querySelector('.questTit').addEventListener('click', () => headerClick(question));
                // var questTitles = document.getElementsByClassName('questTit');

                // for (let j = 0; j < questTitles.length; j++) {
                //     questTitles[j].addEventListener('click', () => headerClick(newQuestion.data.questions[j]));
                // };
            })
            
            if (document.getElementById('q-title').value.length > 100) {
                event.preventDefault();
                document.querySelector('.error-message').style.display = 'block';
                return;
            }

            //check through the tags and see if they're properly formatted
            var tagValue = document.getElementById('q-tags').value;

            tagValue = tagValue.split(" ");

            if (tagValue.length > 5) {
                event.preventDefault();
                document.querySelector('#max-tags').style.display = 'block'; //SHOW THE ERROR MESSAGE
                return;
            }

            const tagArray = document.getElementById('q-tags').value.split(" ");

            console.log(tagArray)

            //this checks if the individual tags are too long or not
            for (let j = 0; j < tagArray.length; j++) {

                if (tagArray[j].length > 10) {
                    event.preventDefault();
                    document.querySelector('#tag-error').style.display = 'block';
                    return;
                }

            }
            
            //Grabbing the form input values

            var title = document.getElementById('q-title').value;
            var text =  document.getElementById('q-description').value;
            var askedBy = document.getElementById('q-username').value;

            //create a question object with the properties as the form input values
            var tempInt = newQuestion.data.questions.length + 1;
            const qObj = ({
                qid: 'q' + tempInt,
                title: title,
                text: text,
                tagIds: [],
                askedBy, askedBy,
                askDate: new Date(),
                ansIds: [],
                views: 0
            })

            //this makes every tag a new tag object, then pushes its tIds into qObj tagIds
            for (let j = 0; j < tagArray.length; j++) {

                //first check if the tag name already exists or not
                var alreadyExists = 0;
                var commonTag;

                for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {

                    console.log("This is the name in tagarray:" + tagArray[j]);
                    console.log("This is the name in newquest:" + newQuestion.data.tags[j2].name);

                    if (newQuestion.data.tags[j2].name.toLowerCase() == tagArray[j].toLowerCase()) {
                        commonTag = newQuestion.data.tags[j2];
                        alreadyExists = 1;
                        break;
                    }

                }

                console.log(alreadyExists);

                console.log(newQuestion.data.tags);

                if (alreadyExists == 0) {

                    var tempTagLength = newQuestion.data.tags.length + 1;

                    let tObj = ({
                        tid: 't' + tempTagLength,
                        name: tagArray[j]
                    })

                    qObj.tagIds.push(tObj.tid);

                    newQuestion.data.tags.push(tObj);

                } else {
                    
                    qObj.tagIds.push(commonTag.tid);
                    
                }

                console.log(newQuestion.data.tags);

            }

            createTags(); //run create tags again after adding a new tag to array

            console.log("these are tag ids within the question object:" + qObj.tagIds);
            console.log(newQuestion.data.tags);

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
            questItem.style.display = "flex";
            questItem.style.justifyContent = 'space-between';

            questItem.innerHTML = `

            <div class = "view_data" style = "padding: 5px">
                <p class = "q-view-data"> Views: ${qObj.views}</p>
                <p class = "q-view-data"> ${qObj.ansIds.length} answers</p>
            </div>  `;

            var headingDiv = document.createElement('div');
            headingDiv.style.padding = "5px";
            headingDiv.style.textAlign = "center";
            headingDiv.className = 'view_heading';

            headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${qObj.title}</h3>`;

            for (let j = 0; j < qObj.tagIds.length; j++) {

                for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {

                    if (qObj.tagIds[j] == newQuestion.data.tags[j2].tid) {

                        var newP = document.createElement('p');
                        newP.style.display = 'inline-block';
                        newP.textContent = `${newQuestion.data.tags[j2].name}`;
                        newP.style.padding = "5px";
                        newP.style.marginLeft = "3px";
                        newP.style.marginRight = "3px";
                        newP.style.backgroundColor = "#585858";
                        newP.style.color = "white";
                        newP.style.borderRadius = "3px";
                        newP.style.border = "1px solid black";
                        headingDiv.appendChild(newP);

                    }

                }

            }

            questItem.appendChild(headingDiv);

            var currentTime = new Date();

            var timeDifference = currentTime - qObj.askDate;
            var timeDifferenceMinutes = timeDifference/(1000 * 60);
            var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
            var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

            var timeDiv = document.createElement('div');
            timeDiv.style.padding = "5px";
            timeDiv.className = "view_time";

            if (timeDifferenceMinutes < 1) {

                timeDiv.innerHTML = `
                <p class = "asker"> ${qObj.askedBy} </p>
                <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
                `;

            } else if (timeDifferenceMinutes < 60) {

                timeDiv.innerHTML = `
                <p class = "asker"> ${qObj.askedBy} </p>
                <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
                `;
                
            } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

                timeDiv.innerHTML = `
                <p class = "asker"> ${qObj.askedBy} </p>
                <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
                `;

            }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

                var monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                  ];

                var dayHours = 0;

                if (question.askDate.getHours() > 12) {
                    dayHours = question.askDate.getHours() - 12;
                } else {
                    dayHours = question.askDate.getHours();
                }

                if (question.askDate.getMinutes() < 10) {
                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                    `;
                } else {
                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                    `;
                }
    
            } else if (timeDifferenceYears > 1) {

                var monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                  ];
    
                  var dayHours = 0;
    
                  if (question.askDate.getHours() > 12) {
                      dayHours = question.askDate.getHours() - 12;
                  } else {
                      dayHours = question.askDate.getHours();
                  }
    
                
                if (question.askDate.getMinutes() < 10) {
                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                    `;
                } else {
                    timeDiv.innerHTML = `
                    <p class = "asker"> ${question.askedBy} </p>
                    <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                    `;
                }
    
            }

            questItem.appendChild(timeDiv);

        questList.appendChild(questItem); //add the list item onto question list

        questItem.querySelector('.questTit').addEventListener('click', () => headerClick(qObj)); // for newly created questions

        document.querySelector('#num-questions').innerHTML = `${newQuestion.data.questions.length} questions`;
        document.getElementById('questions_header').innerHTML = "All Questions";

            //get rid of the form after u submit and return to questions page
            document.querySelector('.question-form').style.display = 'none';
            document.querySelector('.questions-box').style.display = 'block';

            document.querySelector('#num-questions').innerHTML = `${newQuestion.data.questions.length} questions`;

            document.getElementById('newest-button').click();

        };

        // var questTitles = document.getElementsByClassName('questTit');

        // for (let j = 0; j < questTitles.length; j++) {
        //     questTitles[j].addEventListener('click', () => headerClick(newQuestion.data.questions[j]));
        // };

     //questItem.querySelector('.questTit').addEventListener('click', () => headerClick(qObj));

        //WHEN ANSWER BUTTON IS CLICKED, SHOW THE ANSWER FORM
        document.querySelector('.ans-btn').onclick = () => {
            showAnsForm();
        }

        
        document.getElementById('newest-button').click();

        //CREATE THE TAGS ON WINDOW LOAD
        function createTags() {
            //CREATING THE TAGS FOR THE TAGS PAGE
            const tagList = document.querySelector('.tags-list');
        
            while(tagList.firstChild != null){
                tagList.removeChild(tagList.firstChild); //remove every list item from question list
            }
        
            //SHOWING THE NUMBER OF QUESTIONS FOR EACH TAG
            var hashMap = new Map ();
        
            newQuestion.data.questions.forEach(question => {
                question.tagIds.forEach(tagId => { //iterate thru questions tagId arr
                    if(!hashMap.has(tagId)){ //if map doesnt contains the tagid
                        hashMap.set(tagId, 1); //set its value to 1
                    }
                    else{ //if map does contain the tagId already
                        hashMap.set(tagId, hashMap.get(tagId) + 1); //just increment its value by 1
                    }
                })
            })
        
            console.log(hashMap);
            
        
            //DISPLAYING THE TAGS IN HTML
            newQuestion.data.tags.forEach(tag => {
                const tagItem = document.createElement('li');
        
                tagItem.innerHTML = //get the hashmap value for the number of questions!!
               
                `
                <h3 class= "ansTit" style = "color: rgb(35, 144, 246); text-decoration: underline; cursor: pointer;"> ${tag.name}</h3>
                <p> ${hashMap.get(tag.tid)} questions</p> 
        
                `
        
                tagList.appendChild(tagItem);
        
                //add an eventlistener for every Tag 
                tagItem.querySelector('.ansTit').addEventListener('click', () => tagClick(tag));

               
            })
        }
        
        function tagClick(tag){
           // console.log('clicking');
             var searchStr = '[' + tag.name + ']';
            searchQuestion(searchStr,  newQuestion.data.questions, newQuestion.data.tags);
        }

        createTags();

        function showTags (){
            //THIS SHOWS THE TAGS PAGE AND HIDES EVERYTHING ELSE
            document.querySelector('.questions-box').style.display = 'none';
            document.querySelector('.question-details').style.display = 'none';
            document.querySelector('.tag-page').style.display = 'block';
            document.querySelector('.question-form').style.display = 'none';
            document.querySelector('.answer-form').style.display = 'none';
        
            document.querySelector('#num-tags').innerHTML = `${newQuestion.data.tags.length} Tags`; //displays the number of tags
            createTags();
        
        }
       
}; //END OF WINDOW.ONLOAD FUNCTION

//WHEN QUESTIONS NAV IS CLICKED
function myFunction() {

    document.querySelector('#num-questions').innerHTML = `${newQuestion.data.questions.length} questions`;
    document.querySelector('.noresults').style.display = 'none';
    document.getElementById('questions_header').innerHTML = "All Questions";
    document.querySelector('.tag-page').style.display = 'none';
    document.querySelector('#question-nav').style.backgroundColor = 'lightgray';

    //if (document.querySelector('.question-form').style.display == 'flex') {
        document.querySelector('.question-form').style.display = 'none';
        document.querySelector('.question-details').style.display = 'none';
        document.querySelector('.answer-form').style.display = 'none';
        document.querySelector('.questions-box').style.display = 'block';
   // }

    if (document.getElementById('tag-nav').style.backgroundColor == 'lightgray') {
        document.getElementById('tag-nav').style.backgroundColor = 'white';
    }

    const questList = document.getElementById("questions-display");
    //we have to delete every list item from questions List
    while(questList.firstChild != null){
        questList.removeChild(questList.firstChild); //remove every list item from question list
    }
    //and then re-add it because of how the search functionality is implemented
    newQuestion.data.questions.forEach(question => {
        const questItem = document.createElement('li'); //create a new list item for every question
        questItem.style.display = 'flex';
        questItem.style.justifyContent = 'space-between';

        questItem.innerHTML = `

        <div class = "view_data" style = "padding: 5px">
            <p class = "q-view-data"> Views: ${question.views}</p>
            <p class = "q-view-data"> ${question.ansIds.length} answers</p>
        </div>  `;

        var headingDiv = document.createElement('div');
        headingDiv.style.padding = "5px";
        headingDiv.style.textAlign = "center";
        headingDiv.className = 'view_heading';

        headingDiv.innerHTML = `<h3 class="questTit" style = "color : blue"> ${question.title}</h3>`;

        for (let j = 0; j < question.tagIds.length; j++) {

            for (let j2 = 0; j2 < newQuestion.data.tags.length; j2++) {

                if (question.tagIds[j] == newQuestion.data.tags[j2].tid) {

                    var newP = document.createElement('p');
                    newP.style.display = 'inline-block';
                    newP.textContent = `${newQuestion.data.tags[j2].name}`;
                    newP.style.padding = "5px";
                    newP.style.margin = "3px";
                    newP.style.marginLeft = "3px";
                    newP.style.marginRight = "3px";
                    newP.style.backgroundColor = "#585858";
                    newP.style.color = "white";
                    newP.style.borderRadius = "3px";
                    newP.style.border = "1px solid black";
                    headingDiv.appendChild(newP);

                }

            }

        }

        questItem.appendChild(headingDiv);

        var currentTime = new Date();

        var timeDifference = currentTime - question.askDate;
        var timeDifferenceMinutes = timeDifference/(1000 * 60);
        var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
        var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

        var timeDiv = document.createElement('div');
        timeDiv.style.padding = "5px";
        timeDiv.className = "view_time";

        if (timeDifferenceMinutes < 1) {

            timeDiv.innerHTML = `
            <p class = "asker"> ${question.askedBy} </p>
            <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
            `;

        } else if (timeDifferenceMinutes < 60) {

            timeDiv.innerHTML = `
            <p class = "asker"> ${question.askedBy} </p>
            <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
            `;
            
        } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

            timeDiv.innerHTML = `
            <p class = "asker"> ${question.askedBy} </p>
            <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
            `;

        }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)){

            var monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ];

              var dayHours = 0;

              if (question.askDate.getHours() > 12) {
                  dayHours = question.askDate.getHours() - 12;
              } else {
                  dayHours = question.askDate.getHours();
              }

            
            if (question.askDate.getMinutes() < 10) {
                timeDiv.innerHTML = `
                <p class = "asker"> ${question.askedBy} </p>
                <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                `;
            } else {
                timeDiv.innerHTML = `
                <p class = "asker"> ${question.askedBy} </p>
                <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                `;
            }

        } else if (timeDifferenceYears > 1) {

            var monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ];

              var dayHours = 0;

              if (question.askDate.getHours() > 12) {
                  dayHours = question.askDate.getHours() - 12;
              } else {
                  dayHours = question.askDate.getHours();
              }

            
            if (question.askDate.getMinutes() < 10) {
                timeDiv.innerHTML = `
                <p class = "asker"> ${question.askedBy} </p>
                <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
                `;
            } else {
                timeDiv.innerHTML = `
                <p class = "asker"> ${question.askedBy} </p>
                <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
                `;
            }

        }

        questItem.appendChild(timeDiv);

        questList.appendChild(questItem); //add the list item onto question list


        questItem.querySelector('.questTit').addEventListener('click', () => headerClick(question));
      
    })

    document.getElementById('newest-button').click();
    
};

function colorFunction() {
    document.getElementById('question-nav').style.backgroundColor = 'white';
    document.getElementById('tag-nav').style.backgroundColor = 'lightgray';
}

function showAnsForm() {
   
    document.querySelector('.question-details').style.display = 'none';
    document.querySelector('.answer-form').style.display = 'block';

}

function headerClick(question) {

    const ansList = document.querySelector('.answers-list'); //answers unordered list
    document.querySelector('.tag-page').style.display = 'none';
    
    question.views = question.views + 1; //INCREMENT THE VIEWS

    document.getElementById('questions_header').innerHTML = "All Questions"; //CHANGE SEARCH RESULTS TO ALL QUESTIONS
    document.querySelector('.noresults').style.display = 'none'; //GET RID OF NO RESULTS
    
    console.log('The views is ' + question.views);

    //ADDING A NEW ANSWER
    document.querySelector('.answer-form').onsubmit = (event) => {
        event.preventDefault();

        //GRABBING INPUTS FROM THE ANSWER FORM
    
        var ansUser = document.querySelector('.answer-username').value;
        var ansText = document.querySelector('.answer-text').value;

        // console.log(ansUser);
        // console.log(ansText);

        var tempAnsId = newQuestion.data.answers.length + 1;
        const ansObj = ({
            aid: 'a' + tempAnsId,
            text: ansText,
            ansBy: ansUser,
            ansDate: new Date()

        })

       // console.log(ansObj);

       newQuestion.data.answers.push(ansObj);
       question.ansIds.push('a' + tempAnsId);

       //increment the number of answers
       document.querySelector('#num-answers').innerHTML = `${question.ansIds.length} answers`;

       const ansItem2 = document.createElement('li');

       var currentTime = new Date();

       var timeDifference = currentTime - ansObj.ansDate;
       var timeDifferenceMinutes = timeDifference/(1000 * 60);
       var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
       var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

       var timeDiv = document.createElement('div');
       timeDiv.style.padding = "5px";
       timeDiv.className = "view_time";

       if (timeDifferenceMinutes < 1) {

           ansItem2.innerHTML = `
           <p>${ansObj.text}</p>
           <p class = "asker" style = "color:green"> ${ansObj.ansBy} </p>
           <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
           `;

       } else if (timeDifferenceMinutes < 60) {

           ansItem2.innerHTML = `
           <p>${ansObj.text}</p>
           <p class = "asker" style = "color:green"> ${ansObj.ansBy} </p>
           <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
           `;
           
       } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

           ansItem2.innerHTML = `
           <p>${ansObj.text}</p>
           <p class = "asker" style = "color:green"> ${question.ansBy} </p>
           <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
           `;

       }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

           var monthNames = [
               'January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November', 'December'
             ];

             var dayHours = 0;

             if (ansObj.ansDate.getHours() > 12) {
                 dayHours = ansObj.ansDate.getHours() - 12;
             } else {
                 dayHours = ansObj.ansDate.getHours();
             }

           if (ansObj.ansDate.getMinutes() < 10) {
               ansItem2.innerHTML = `
               <p>${ansObj.text}</p>
               <p class = "asker" style = "color:green"> ${ansObj.ansBy} </p>
               <p> asked on ${monthNames[ansObj.ansDate.getMonth()]} ${ansObj.ansDate.getDay()} at ${dayHours}:0${ansObj.ansDate.getMinutes()}</p>
               `;
           } else {
               ansItem2.innerHTML = `
               <p>${ansObj.text}</p>
               <p class = "asker" style = "color:green"> ${ansObj.ansBy} </p>
               <p> asked on ${monthNames[ansObj.ansDate.getMonth()]} ${ansObj.ansDate.getDay()} at ${dayHours}:${ansObj.ansDate.getMinutes()}</p>
               `;
           }

       } else if (timeDifferenceYears > 1) {

           var monthNames = [
               'January', 'February', 'March', 'April', 'May', 'June',
               'July', 'August', 'September', 'October', 'November', 'December'
             ];

             var dayHours = 0;

             if (ansObj.askDate.getHours() > 12) {
                 dayHours = ansObj.ansDate.getHours() - 12;
             } else {
                 dayHours = ansObj.ansDate.getHours();
             }

           
           if (ansObj.ansDate.getMinutes() < 10) {
               ansItem2.innerHTML = `
               <p>${ansObj.text}</p>
               <p class = "asker" style = "color:green"> ${ansObj.ansBy} </p>
               <p> asked on ${monthNames[ansObj.ansDate.getMonth()]} ${ansObj.ansDate.getDay()}, ${ansObj.ansDate.getFullYear()} at ${dayHours}:0${ansObj.ansDate.getMinutes()}</p>
               `;
           } else {
               ansItem2.innerHTML = `
               <p>${ansObj.text}</p>
               <p class = "asker" style = "color:green"> ${ansObj.ansBy} </p>
               <p> asked on ${monthNames[ansObj.ansDate.getMonth()]} ${ansObj.ansDate.getDay()}, ${ansObj.ansDate.getFullYear()} at ${dayHours}:${ansObj.ansDate.getMinutes()}</p>
               `;
           }

       }

        ansList.appendChild(ansItem2);

       console.log('i have pushed it successfully');

       console.log(newQuestion.data);

        document.querySelector('.answer-username').value = "";
        document.querySelector('.answer-text').value = ""; //refreshing the input

        document.querySelector('.answer-form').style.display = 'none'; //hide the form after submission
        document.querySelector('.question-details').style.display = 'block'; //go back to the question details

    }

    console.log('im here!');

    //Rest of headerclick
    
    document.querySelector('.questions-box').style.display = 'none';
    document.querySelector('.question-details').style.display = 'block';
    document.querySelector('.ask-btn2').style.display = 'block';

    //SHOWING THE QUESTION DETAILS

    document.querySelector('#num-answers').innerHTML = `${question.ansIds.length} answers`;
    document.querySelector('#question-title').innerHTML = `${question.title}`;
    document.querySelector('#num-views').innerHTML = `${question.views} views`;
    document.querySelector('#quest-text').innerHTML = `${question.text}`;
    document.querySelector('#quest-user').innerHTML = `${question.askedBy}`;
    document.querySelector('#quest-date').innerHTML = `${question.askDate}`;


    var currentTime = new Date();

    var timeDifference = currentTime - question.askDate;
    var timeDifferenceMinutes = timeDifference/(1000 * 60);
    var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
    var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);

    var timeDiv = document.createElement('div');
    timeDiv.style.padding = "5px";
    timeDiv.className = "view_time";

    if (timeDifferenceMinutes < 1) {

        document.querySelector('#quest-date').innerHTML = `
        <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
        `;

    } else if (timeDifferenceMinutes < 60) {

        document.querySelector('#quest-date').innerHTML = `
        <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
        `;
        
    } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {

        document.querySelector('#quest-date').innerHTML = `
        <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
        `;

    }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {

        var monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ];

          var dayHours = 0;

          if (question.askDate.getHours() > 12) {
              dayHours = question.askDate.getHours() - 12;
          } else {
              dayHours = question.askDate.getHours();
          }

        if (question.askDate.getMinutes() < 10) {
            document.querySelector('#quest-date').innerHTML = `
            <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
            `;
        } else {
            document.querySelector('#quest-date').innerHTML = `
            <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()} at ${dayHours}:${question.askDate.getMinutes()}</p>
            `;
        }

    } else if (timeDifferenceYears > 1) {

        var monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ];

          var dayHours = 0;

          if (question.askDate.getHours() > 12) {
              dayHours = question.askDate.getHours() - 12;
          } else {
              dayHours = question.askDate.getHours();
          }

        
        if (question.askDate.getMinutes() < 10) {
            document.querySelector('#quest-date').innerHTML = `
            <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:0${question.askDate.getMinutes()}</p>
            `;
        } else {
            document.querySelector('#quest-date').innerHTML = `
            <p> asked on ${monthNames[question.askDate.getMonth()]} ${question.askDate.getDay()}, ${question.askDate.getFullYear()} at ${dayHours}:${question.askDate.getMinutes()}</p>
            `;
        }

    }

    var uniqueAns = [];

    while(ansList.firstChild != null){ //removing everything like before
        ansList.removeChild(ansList.firstChild); //remove every list item from question list
    }

    
    question.ansIds.forEach(id => {  //iterate through each question checking its ansIds array
        newQuestion.data.answers.forEach(answer => { //iterrate through answers to see if any matches
            if(id == answer.aid){
                if(!uniqueAns.includes(answer.aid)){
                    uniqueAns.push(answer.aid); //only want unique answers b/c theres duplicates
                }
                //console.log(answer.aid);
            }
        })
    })

     console.log(uniqueAns.length);
     console.log(uniqueAns);


    
        //SHOWING ANSWERS FOR EACH QUESTION

    for(let i = 0; i < uniqueAns.length; i++){
        newQuestion.data.answers.forEach(answer => {
            if(uniqueAns[i] == answer.aid){
                const ansItem = document.createElement('li');

                var currentTime = new Date();

                var timeDifference = currentTime - answer.ansDate;
                var timeDifferenceMinutes = timeDifference/(1000 * 60);
                var timeDifferenceHours = timeDifference/(1000 * 60 * 60);
                var timeDifferenceYears = timeDifference / (1000 * 60 * 60 * 24 * 365.25);
         
                var timeDiv = document.createElement('div');
                timeDiv.style.padding = "5px";
                timeDiv.className = "view_time";
         
                if (timeDifferenceMinutes < 1) {
         
                    ansItem.innerHTML = `
                    <p>${answer.text}</p>
                    <p class = "asker" style = "color:green"> ${answer.ansBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000))} seconds ago</p>
                    `;
         
                } else if (timeDifferenceMinutes < 60) {
         
                    ansItem.innerHTML = `
                    <p>${answer.text}</p>
                    <p class = "asker" style = "color:green"> ${answer.ansBy} </p>
                    <p> asked ${Math.floor(timeDifferenceMinutes)} minutes ago</p>
                    `;
                    
                } else if ((timeDifferenceMinutes >= 60) && (timeDifferenceHours < 24)) {
         
                    ansItem.innerHTML = `
                    <p>${answer.text}</p>
                    <p class = "asker" style = "color:green"> ${question.ansBy} </p>
                    <p> asked ${Math.floor(timeDifference/(1000 * 60 * 60))} hours ago</p>
                    `;
         
                }  else if ((timeDifferenceHours >= 24) && (timeDifferenceYears < 1)) {
         
                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
         
                      var dayHours = 0;
         
                      if (answer.ansDate.getHours() > 12) {
                          dayHours = answer.ansDate.getHours() - 12;
                      } else {
                          dayHours = answer.ansDate.getHours();
                      }
         
                    if (answer.ansDate.getMinutes() < 10) {
                        ansItem.innerHTML = `
                        <p>${answer.text}</p>
                        <p class = "asker" style = "color:green"> ${answer.ansBy} </p>
                        <p> asked on ${monthNames[answer.ansDate.getMonth()]} ${answer.ansDate.getDay()} at ${dayHours}:0${answer.ansDate.getMinutes()}</p>
                        `;
                    } else {
                        ansItem.innerHTML = `
                        <p>${answer.text}</p>
                        <p class = "asker" style = "color:green"> ${answer.ansBy} </p>
                        <p> asked on ${monthNames[answer.ansDate.getMonth()]} ${answer.ansDate.getDay()} at ${dayHours}:${answer.ansDate.getMinutes()}</p>
                        `;
                    }
         
                } else if (timeDifferenceYears > 1) {
         
                    var monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                      ];
         
                      var dayHours = 0;
         
                      if (answer.ansDate.getHours() > 12) {
                          dayHours = answer.ansDate.getHours() - 12;
                      } else {
                          dayHours = answer.ansDate.getHours();
                      }
         
                    
                    if (answer.ansDate.getMinutes() < 10) {
                        ansItem.innerHTML = `
                        <p>${answer.text}</p>
                        <p class = "asker" style = "color:green"> ${answer.ansBy} </p>
                        <p> asked on ${monthNames[answer.ansDate.getMonth()]} ${answer.ansDate.getDay()}, ${answer.ansDate.getFullYear()} at ${dayHours}:0${answer.ansDate.getMinutes()}</p>
                        `;
                    } else {
                        ansItem.innerHTML = `
                        <p>${answer.text}</p>
                        <p class = "asker" style = "color:green"> ${answer.ansBy} </p>
                        <p> asked on ${monthNames[answer.ansDate.getMonth()]} ${answer.ansDate.getDay()}, ${answer.ansDate.getFullYear()} at ${dayHours}:${answer.ansDate.getMinutes()}</p>
                        `;
                    }
         
                }

                ansList.appendChild(ansItem);
            }
        })
    }

   
}





