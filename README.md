# ULHacks2021-TASL
TASL seeks to educate and empower learners in American Sign Language by teaching basic vocabulary and grammar. Our goal is to encourage inclusivity and accessibility for the deaf and hard of hearing community.

## Inspiration
### Theme: American Sign Language
TASL (Teaching American Sign Language) was inspired by a viral video of an American Sign Language interpreter translating lyrics to a live performance at a music festival. We were intrigued by the interpreter’s rapid, rhythmic movements to the beat. The ability to communicate through only movement and facial expressions left us in awe, and we decided to embark on a quest to create an educational tool for ASL learners. Similar to how one might learn a language for the purposes of better communication or appreciation for culture, ASL is a bridge for communication between the two groups that is otherwise disconnected. By creating TASL, we hope to inspire the public to appreciate the community and establish greater accessibility for our society by promoting inclusivity.

### Name & Mascot
![Tassel](https://raw.githubusercontent.com/KathleenX7/ULHacks2021-TASL/main/Images/Logo/Mascot.png)  
We were inspired by [Duolingo](https://www.duolingo.com) and various other educational platforms to incorporate an animal as a symbol. Meet Tassel (above), our octopus mascot! With most cephalopods being near-deaf or fully deaf, Tassel serves as the perfect mascot for an application that teaches sign language. Tassel fittingly wears a scholar’s hat with a tassel, and its name is the pronunciation to the company name and acronym, TASL (Teaching American Sign Language). 

## What it does
TASL is an easy-to-use web application that teaches American Sign Language. There are eight different topics available: alphabet, numbers, one word question, adjectives, nouns, verbs, common expressions, and the final exam. Each section teaches a set of words or phrases and its corresponding ASL hand symbol. For example, the common expression category teaches useful words such as “hello”, “goodbye”, “please”, and “thanks”. The user can test their knowledge in each section through multiple choice questions. After the user completes all of the previous sections, they can challenge themselves with the final exam, which contains any of the questions from the different topics. With a 70% pass on the final exam, the user becomes TASL certified. 
![certificate](https://media.discordapp.net/attachments/875911181104209994/876336482867101716/Slideshow.png)

## How we built it
### Planning 
Our team first had a meeting to discuss possible educational related problems or obstacles, and projects that could be created to meet those needs, as well as possible issues we could face when creating them. We settled on a website that teaches the user [American Sign Language](https://en.wikipedia.org/wiki/American_Sign_Language), and started formulating possible features that could be added to the project, including a point system, stored data through accounts, a friend and leaderboard system, etc. Two of our members started working on the questions and images that are to be used in the game while the other two worked on the code for the website. 

### Questions
After deciding on the topics and mechanics of the game, we chose questions and symbols that fit those topics. We organized all of the above using Google Sheets, and created multiple choice questions for each category. The final exam contains questions chosen from each of the previous topics. 

### Code
The back end was built using [node.js](https://nodejs.org/en/), [socket.io](https://socket.io/), and [expressjs](https://expressjs.com/). We used a combination of [express cookies](http://expressjs.com/en/resources/middleware/cookie-parser.html) and [JavaScript objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) on the server side as storage. The application keeps track of whether users are signed in using cookies, and stores their progress. Privacy issues have been fully taken into account, and TASL is equipped to keep users’ data confidential and protected. For the front end, we used HTML and CSS. After planning the different pages, we created pages using a variety of different [HTML components](https://developer.mozilla.org/en-US/) such as tables, buttons, input, etc. Furthermore, to keep the code more organized and reduce the amount of redundant code, we used CSS styling.

## Challenges we ran into
None of our team members had knowledge regarding the use of web cookies, so it had to be learned during the hackathon. It was a challenge to set up the cookies on the web page and read from them. Some of our images were (and still are) blurry due to how quickly we had to put this together.

## Accomplishments that we're proud of
Our mascot’s name took a great deal of debating and brainstorming, so we are quite proud of the name we ended up creating, which has three different meanings. Firstly, TASL is an acronym for Teaching American Sign Language. Secondly, as a scholarly octopus mascot, Tassel wears a tassel on its cap. Tassel additionally shares a name with TASL as a homonym. We put in 85 questions! We’re also very proud of the graphics; they’re smooth and look nice (blurry images aside).

## What we learned
We learned how to use express cookies, how to use an external style sheet for CSS, that [Google Slides](https://docs.google.com/presentation) is actually a really good planning platform. The most important thing we learned during this hack was ASL.

## What's next for TASL?
### Problem Bank
As a next step, we can expand the scope of educational materials offered. We can add more words and expressions for the categories of adjectives, nouns, verbs, and common expressions. As well, we can add more topics, such as sections teaching grammatical structure and complex sentences. We can also increase the effectiveness of the quizzes by utilizing more question formats, such as fill in the blanks, matching, etc. Finally, we can hire a professional ASL interpreter to ensure the accuracy of the information and provide professional credibility.

### Graphics
To create a more visually appealing and attractive platform, our next steps are to incorporate a more prevalent “under-the-sea” theme and perhaps use elements such as fish, bubbles, or coral. While uploading sign language images to our question bank, we resorted to low resolution images with poor direction. With more time, we can create a standardized image set and illustrate or animate the hand signals ourselves. 

### Expanding Platforms
TASL is considering the possibility of expanding our venture onto other platforms, including mobile and desktop applications for to-go options and better organization. Additionally, we may create another application geared towards classroom learning for elementary schools, thus expanding the community of learners and promoting inclusivity.
