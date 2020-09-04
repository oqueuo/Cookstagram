<h1>Cookstagram</h1>

A recipe-sharing social network application where users can create their own recipes or explore others’ recipes to save to their collection

<h2>Installation</h2>

Install dependencies:

Navigate to the root project folder and run the following command to install the necessary Python dependencies:

> pip install -r backend/requirements.txt

Generate a Django secret key and place in line 23 of 'Cookstagram/backend/appmain/settings.py'

Create the database by navigating to 'Cookstagram/backend/' and running the following two commands:

> python manage.py makemigrations

> python manage.py migrate


Navigate to 'Cookstagram/frontend/'. Install node dependencies by running the following:

> npm i
