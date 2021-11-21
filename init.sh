#! /bin/sh

pip install -r requirements.txt
flask initdb
flask run