#! /bin/sh
export FLASK_APP=server
export FLASK_ENV=development
export DATABASE_URL=complaints
echo "Successfully set env variables" 
virtualenv -p /usr/bin/python3 /tmp/dbmsPrj
. /tmp/dbmsPrj/bin/activate