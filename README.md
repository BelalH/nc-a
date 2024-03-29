****************
Notejam: Express
****************

Notejam application implemented using `Express.js <http://expressjs.com/>`_ microframework.

Express version: 4.2

Middlewares/extentions used:

* `Passport.js <http://passportjs.org/>`_ for authentication
* `Node ORM 2 <https://github.com/dresende/node-orm2>`_ for database
* `Mocha <http://mochajs.org/>`_ and `Superagent <http://visionmedia.github.io/superagent/>`_ for testing
* ... and `others <https://github.com/komarserjio/notejam/blob/express/express/notejam/package.json>`_


Installation and launching
==========================

-------
Cloning
-------

Clone the repo:

.. code-block:: bash

    $ git clone git@github.com:komarserjio/notejam.git YOUR_PROJECT_DIR/

-------------------
Install environment
-------------------
Use `npm <https://www.npmjs.org/>`_ to manage dependencies.

Install dependencies

.. code-block:: bash

    $ cd YOUR_PROJECT_DIR/
    $ npm install

Create database schema

.. code-block:: bash

    $ cd YOUR_PROJECT_DIR/
    $ node db.js

------
Launch
------

Start built-in web server:

.. code-block:: bash

    $ cd YOUR_PROJECT_DIR/
    $ DEBUG=* ./bin/www

Go to http://127.0.0.1:3000/ in your browser

------------------
Running unit tests
------------------

Run unit tests:

.. code-block:: bash

    $ cd YOUR_PROJECT_DIR/
    $ ./node_modules/mocha/bin/mocha tests


------------------
ECR initialization
------------------
ECR is used to manage code versions, this is going to be helpful to manage deploying to ECS 

login

    $ aws ecr get-login --region ap-southeast-1 --no-include-email
    $ docker login -u AWS -p <...rest of command>
    $ aws ecr create-repository --repository-name <repo-name>

the previouse command should show the repository url, make sure you copy it because you are going to need it in the incoming commands 

------------------
Run Docker
------------------

Build project 

    $ docker build -t <repo-name>:latest .
    $ docker images

Run project on local device over port 3000

    $ docker run -it --expose 3000 -p 3000:3000 <image-id>
    
Push Project to ECR

    $ docker tag <repo=name>:latest <repo-url>/<repo-name>:latest
    $ docker push <repo-url>/<repo-name>:latest


---------------------
Deploy infrastructure
---------------------
Before running any of the following commands make sure your credentials have the required region in it

    $ cat ~/.aws/credentials

    [default]
    aws_access_key_id     = <aws_access_key_id>
    aws_secret_access_key = <aws_secret_access_key>
    region                = ap-southeast-1


run the following commands

    $ cd YOUR_PROJECT_DIR/

Create Required IAM ROle 

    aws cloudformation create-stack --stack-name iam --template-body file://$PWD/iam.yaml --capabilities CAPABILITY_IAM

Create VPC and Networking

    aws cloudformation create-stack --stack-name vpc-prod --template-body file://$PWD/vpc.yaml --parameters file://$PWD/environment/prod/vpc.json

Create ECS Cluster 

    $aws cloudformation create-stack --stack-name app-cluster-prod --template-body file://$PWD/infra/app-cluster.yaml --parameters file://$PWD/infra/environment/prod/app-cluster.json

Create Services and tasks for the ECS cluster

    aws cloudformation create-stack --stack-name api-prod --template-body file://$PWD/api.yaml --parameters file://$PWD/environment/prod/api.json

Create Database

    aws cloudformation create-stack --stack-name rds-prod --template-body file://$PWD/rds.yaml --parameters file://$PWD/environment/prod/rds.json



Contribution
============

Please send your pull requests in the ``master`` branch.

Always prepend your commits with a framework name:

.. code-block:: bash

    Express: Implemented sign in functionality