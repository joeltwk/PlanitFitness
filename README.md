Welcome to PlanitFitness

To get started, first install the planitFitness sql db in the folder.

After installing the db, open the backend folder. In the application.properties file you'll see spring.sql.init.mode = always 

The data and schema sql files will run and add the needed tables and data. The program will not work without adding data this week for now as there's no implementation of registering a new user at this point.

After running the backend, open the planitFitness folder which contains the client. Navigate in the terminal till you reach the folder directory.

Run "npm install" to install the needed dependencies. Then run "npm run dev"

 VITE v5.3.1  ready in 184 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

Go to the local host address given.

You'll now see a login page, login using the following details: 
username: HelenDown
password: password1

After logging in, you'll see that there are 3 sections to the app: Workouts, Routines and Exercises.

Scrolling all the way down, you'll be able to see exercises already added to HelenDown's exercise library, feel free to use the pagination to navigate between pages. You may also add additional exercises by clicking on "Create Exercise" and then filling in the needed input.

You can also edit each exercise giving it a new name or category, or you can delete the exercise if needed. There is also a sort function to sort the exercise by name or category.

Above the Exercise section is the Routine section. Here you can view the routines available in HelenDown's account. By clicking on the existing routines you'll see the exercises in the routine, you may also add new exercises by clicking on the exercises from the menu on the right. You may also edit the exercise by giving it a new name or description, or delete the exercise. Save the exercises after you're done.

You can also create a new routine by clicking the Create Routine button and entering the needed input.

Above the Routine section is the Workout section. Here you'll see the workout completed by HelenDown. By clicking on the workout, you'll see the information on it, the date it was completed and the routine that was done during that workout. You may continue to edit the workout accordingly by adding more sets or editing each set. But since this workout is marked as complete you can create a new one. Close the workout pop up.

Click on start workout. Choose a routine, you would like to do, but ensure it has exercises in it if not, go back to routine to add exercises. After selecting the routine, click save. You'll now see a new workout in the section that isn't complete. Click on it. As you do the exercise, you can add a set that you're doing, enter the weight and the reps you did. It will log the set that you did. If you added wrongly, you can always click on the set and edit the values.

After adding a few sets, you can always delete a set if needed, it will update accordingly. Mark the workout as complete when you're done, and the block will change to orange and reflect as completed.

Thank you for using PlanitFitness
