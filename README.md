## Task manager frontend

[![Build Status](https://travis-ci.org/damoresa/taskmanager-frontend.svg?branch=master)](https://travis-ci.org/damoresa/taskmanager-frontend)
[![Coverage Status](https://coveralls.io/repos/github/damoresa/taskmanager-frontend/badge.svg)](https://coveralls.io/github/damoresa/taskmanager-frontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=taskmanager-frontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=taskmanager-frontend)

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
  
As of 6/12/2017 the frontend application is _multiplatform_ and works in the 
browser, on desktop and on Android devices with the same source code. 
[Cordova](https://cordova.apache.org/) is used for mobile integration 
and [electron](https://electronjs.org/) is used for desktop integration.
  
As of 08/12/2017, the _Karma_ and _Jasmine_ unit tests have been implemented, but 
no template validation has been implemented - ie, accessing the DOM objects from 
the unit tests context. _Coveralls_ has been integrated and the coverage result is 
displayed.

As of 25/12/2017 _SonarCloud_ support has been implemented.
  
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
* __Multiplatform__: supports _electron_ and _Cordova_ out of the box: an _electron_ 
desktop client and a _Cordova_ Android apk are released with every tag.
  
_Webpack_ manages the application and resources bundling and minification.
  
  
### Backend
  
As of 5/12/2017 the frontend has been moved away from the backend repository,  
which can be found [here](https://github.com/damoresa/taskmanager).
  
  
### Future features
  
You can check future features [here](https://github.com/damoresa/taskmanager#future-features).  
In addition to those, you can expect these:
* Success / error notification toasts on the different actions in order to improve UX.
  
  
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
