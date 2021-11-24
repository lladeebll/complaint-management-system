# complainReg-backEnd

To run the server

1. Create a database named `complaints` in postgresql.
2. Activate a virtual env.
3. Run following commands

```bash
pip install -r requirements.txt     #to install requiremented libraries.
. setenv.sh                         #to set env variables.
flask initdb                        #to initialize the database.
```

4. Run `flask run` to run the server in your local machine
