## TaskPlanner Webapp
<img alt="Django" src="https://img.shields.io/badge/django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="Postgres" src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
 <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>


TaskPlanner is a Web App that lets users manage and organize daily or weekly tasks, Create reminders and calendar events and create custom to-do lists.

**Live preview** (signup required):
https://todolist-taskplanner.herokuapp.com/


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
