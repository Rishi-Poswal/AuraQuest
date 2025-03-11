
# LANDING PAGE
    - website name in style
    - describing top features
    - get started / sign in

# SIGN IN
    - will take username/email and password to sign in    //forgot password feature later if got time
    - after sign in, flow will go to home page
   
# SIGN UP
    - with google, github (advance feature...for later)
    otherwise
    - email         //check if already in use... apply later so that we can make more accounts with same email for testing
    - username      //check if already in use
    - check otp
 
    - category 
       - Student
       - student and CR   //only two CR of a batch , should be able to update this info (by admin maybe)
       - faculty
       - TA    //maybe similar to faculty
       - admin
    - details  badges [objectId badge]
       - name, reg no., batch, semester, section
       - 

# HOME    
    - have to design a layout
    - there should be a side menu or top menu
    - your aura points should be visible //highlighted
    - daily challenge
      - option to see past daily challenges and do them if not done
    - separate blocks to display...
      - deadlines (in according to time remaining)   //deadline of assignment, project, self-set goal, etc
      - next class in xyz hours                      //option to mark cancel
      - a mini calender marked with exam dates and deadline submissions
      - a leaderboard
      

# DASHBOARD
    - like leetcode dashboard i guess
    - profile info and pic in side //option to fill more details
    - blocks to display
       - total aura points
       - rank
       - total daily challenges solved
       - total absents and presents (subject wise attendance i guess)
       - a badge according to aura points
       - total assignments submitted
       
       
# add or PLUS BUTTON //maybe in menu or dashbaord or home
- add reminder
- add course milestones (chapters)
- add your schedule (when user choose a time for class, we somehow have to link it to the global subjects in his profile)       
- add self-goal
- 

# MENTOR PAGE
    - a list of doubts posted by juniors will be visible
    - answer them and if the user(who asked doubt) upvote you - you get aura pts
    - "ask your doubt" option so that you can ask your seniors

# POMODORO STUDY SESSION PAGE
    - there should be a big timer running
    - after 25mins a notification or timer rings
    - after clicking break, a timer of 5mins break start
    - then continue to start 25min study session
    - after 4 cycles , a longer break of 20-30min
    - also there should be "add note" option which will be visible (in order of insertion) during the session

# CHALLENGE FRIEND
- make a challenge and challenge your friend/friends  (with a deadline)
- he/she will accept and timer starts 
- whoever "done" first will get aura pts and other one will lose


# NOTIFICATION PAGE
    - all the notifications
    - read will be shown below
    - unread will be highlighted and shown above
    - once opened this page , all the notifications till then will be marked read  
    



# SEARCH FRIEND
- using his username
- or a list of batchmates
- send friend request
- he will request


# STUDY GROUPS/ GROUP PROJECTS




# WHO WILL ADD NEW ASSIGNMENTS DEADLINES, etc

- lab assignment - TA or CR
- class project deadline (if same for all) - CR
- class project deadline (if variable) - you or team leader
- exam schedule - one of the CR or admin
- semester course ( one of the CR or admin or faculty)
    - who will divide a course - admin or faculty or a student himself
- class time table - CR (can change it too)

-NOTE: When CR adds a deadline , he will be asked if it for the whole section or personal



# NOTIFICATIONS

- 15 min before starting of next class
- after the class, notification mark present or absent (if not answered for 24hrs, mark this class as absent)
- daily challenge notification (in morning maybe)
- new deadline added by CR 
- 24hrs remaining for a deadline, then 12 hrs, then 6 hrs, then 3hrs, then 1hr, then 30mins, then 10mins
- next up on schedule (10mins before)
- pomodoro session notifications
- got friend request notification
- your doubt answered/ you got upvote 
- you've been challenged - accept/decline


# HOW TO KNOW IF A DEADLINE IS REALLY COMPLETED
  - will have to rely on the student for now
  - also we can't store pdf files as proof of a assign submission as 3000-4000 students submitting 1mb file will generate a lot of storage




# HOW TO GENRATE A DAILY CHALLENGE
   - firstly a daily challenge will be same for a particular branch-batch and different for others  
   - we can store topics from different subjects in that semester-branch 
   - iterate randomly over them and give that topic to an AI API to generate a question on this topic
   - can give coding questions too i guess 
   - not sure about evaluation of daily challenge yet


# WHEN A SEMESTER ENDS


# AURA POINTS RULES
- sign up :-  +x
- sign in :-  +x
- daily challenge  :-  +x
- past daily challenge :- +x
- completion of a deadline work  :-  +x pts * remaining days\
- not completeing a deadline:       -y pts
- attending class  :-   +x
- absent in a class:-   -y
- achieving a course milestone:- 
- completing a self set goal:-
- asking a doubt:- 
- answering a doubt:-
- completing a 4cycle pomodoro session:-
- winning a challenge friend :-
- losing a challenge friend:-


# Admin controls
- Add courses 
- Add assignment  
- 

