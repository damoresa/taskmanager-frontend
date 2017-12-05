## Task manager frontend

[![Build Status](https://travis-ci.org/damoresa/taskmanager-frontend.svg?branch=master)](https://travis-ci.org/damoresa/taskmanager-frontend)
[![Coverage Status](https://coveralls.io/repos/github/damoresa/taskmanager-frontend/badge.svg)](https://coveralls.io/github/damoresa/taskmanager-frontend)

Task management application that features an _Angular_ frontend 
and a [_NodeJS_ backend](https://github.com/damoresa/taskmanager) 
with a _MongoDB_ database.  
The backend is designed to be deployed on [Heroku](https://www.heroku.com) 
on a free or hobby dyno and is thought for individual use - as in one 
user per application instance as of 28/11/2017 - so most of it's 
provided tooling is either used or recommended. On the other hand, the 
frontend is designed to be deployed on any CDN like [surge](https://surge.sh/). 
  
As of 5/12/2017 the application goes through _TravisCI_ and _Coveralls_ 
and is automatically deployed to _surge_. Unit tests are not yet implemented tho.
  
The purpose of the application is to actually help myself manage 
my own time in order to be able to analyze certain scenarios.
  
  
### Project structure
  
The project contains the following folders:
* __Config__: _Webpack_ configuration files. The current build supports an _electron_ 
build in order to deploy the frontend application as a desktop application.
* __karma__: _Karma_ environment configuration.
* __src__: application sources.
  
  
### Frontend
  
The frontend application has been built with _Angular_ and _Webpack_. 
This frotend features: 
  
* __Router__: simple routing and _lazy_ routing.
* __Forms__: reactive forms with validations.
* __Common__: image and directive usages.
* __Http__: http requests and _RxJS_ usage, wrapped to provide _JWT_ support.
* __Components__: contains _grid_, _pagination_, _toast_ and _modal_ 
reusable and configuratble components.
  
_Webpack_ manages the application and resources bundling and minification.
  
  
### Backend
  
As of 5/12/2017 the frontend has been moved away from the backend repository,  
which can be found [here](https://github.com/damoresa/taskmanager).
  
  
### Future features
  
You can check future features [here](https://github.com/damoresa/taskmanager#future-features).
Also, you can expect unit tests on the frontend - using _Karma_ 
and _Jasmine_ - soon enough.
  
  
### Running the project

In order to execute locally, run the following script:

```bash
npm start
```
  
In order to build the sources with the _JIT_ compiler, run the following script:

```bash
npm run build:production
```
  
In case you want to use _AOT_ compilation, run this script instead:

```bash
npm run build:production:aot
```