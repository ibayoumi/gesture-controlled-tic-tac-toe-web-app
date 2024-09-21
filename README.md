--Readme document for Ismail Bayoumi, ibayoumi@uci.edu, 68471030--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

15/15
- 5/5 Created a functional web app
- 2/2 The ability to control the web app with basic gestures
- 4/4 The ability to control the web app with at least two custom gestures
- 2/2 Following good principles of UI design
- 1/1 Creating a compelling app and application of gestures
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
40


3. What online resources did you consult when completing this assignment? (list specific URLs)
https://codepen.io/shammadahmed/pen/JOWEGW
https://stackoverflow.com/questions/67987600/typescript-type-number-cannot-be-used-as-an-index-type
https://codeburst.io/how-to-add-styles-in-angular-e6918228eff2
https://codeburst.io/how-to-add-styles-in-angular-e6918228eff2
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
https://stackoverflow.com/questions/54566536/text-color-for-different-status-angular-6
https://codecraft.tv/courses/angular/built-in-directives/ngstyle-and-ngclass/
https://www.golinuxcloud.com/create-10-second-timer-javascript/
https://digitalsynopsis.com/design/color-palettes-combinations-schemes/
https://www.angularfix.com/2022/01/how-to-implement-nested-ngfor-in-angular.html
https://stackblitz.com/edit/angular-nested-ngfor-n2firj?file=app%2Fapp.component.html,app%2Fapp.component.ts
https://stackoverflow.com/questions/14455844/is-that-possible-to-make-video-mirrored
https://getbootstrap.com/docs/4.0/utilities/flex/
https://stackoverflow.com/questions/6913234/how-to-set-different-colors-in-html-in-one-statement
https://www.codecademy.com/forum_questions/53ec461e9c4e9d0915000912
https://angular.io/api/common/NgClass
https://stackoverflow.com/questions/35269179/angular-conditional-class-with-ngclass
https://stackoverflow.com/questions/953918/how-to-align-a-div-to-the-middle-horizontally-width-of-the-page
https://developers.google.com/fonts/docs/getting_started
https://fonts.google.com/


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?



5. Is there anything special we need to know in order to run your code?



--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
The app was designed to allow 2 players to play quick rounds of tic-tac-toe only using hand gestures.
A timer was added for every player's turn to make rounds go by faster, but the timer can be paused if players feel that they need more time to play their turn.


7. Describe the two custom gestures you created.
I added a 10 second timer for every player's turn, so that the tic tac toe round plays out faster.
Custom Gesture 1: One open hand and one closed hand pause the timer, which would be used if a player wants to take a break in the middle of a round, or if the players don't want to use the timer.
Custom Gesture 2: One pointing hand and one closed hand resume the timer that was previously paused, which would be used when a player returns to the round they stopped midway.
Basic Gestures:
- Two Open Hands: start game
- Closed Hand: move position (hand pinching also works)
- Open Hand: play turn
- Two Pointing Hands: reset board
- Two Closed Hands: reset game


8. How does your app implement or follow principles of good UI design?
Used complementary colors from: https://digitalsynopsis.com/design/color-palettes-combinations-schemes/ to improve visibility of elements.
Added instructions for the supported gestures and what they do, to improve user experience and ease of use.
Used bootstrap to make the web app accessible and responsive, and Google Fonts to personalize the app with fonts.
Additional features:
- I tried to flip the video camera so that it was a mirror image, but changing the flipHorizontal property in handtracker.component.ts didn't work.
- Also tried adding icons for the hand gestures supported but my font awesome kit didn't work in the project.
