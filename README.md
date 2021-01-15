## TodoList Webapp

TodoList is a webapp that let's users create and schedule tasks and create custom lists.

**Live preview** (signup required):
https://todolist-taskplanner.herokuapp.com/


**Technoligies:**
 - Django python web framework
 - html/css (Responsive)
 - javascript
 - postgresql
 
 ## Setup

The first thing to do is to clone the repository:

    $ git clone https://github.com/mohaned-hassan/ToDo.git
    $ cd ToDo

Create a virtual environment to install dependencies in and activate it:

    $ virtualenv2 --no-site-packages env
    $ source env/bin/activate

Then install the dependencies:

    (env)$ pip install -r requirements.txt

Note the  `(env)`  in front of the prompt. This indicates that this terminal session operates in a virtual environment set up by  `virtualenv2`.

Once  `pip`  has finished downloading the dependencies:

    (env)$ cd project
    (env)$ python manage.py runserver

And navigate to  http://127.0.0.1:8000

then Signup by entering email, username and password.
