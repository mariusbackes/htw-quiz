# htw-quiz

[![Build Status](https://travis-ci.com/mariusbackes/htw-quiz.svg?token=Jx5oxfWFAmzkZjbjCxpQ&branch=master)](https://travis-ci.com/mariusbackes/htw-quiz)

Eine Webapplikation für die htw-saar zum spielerischen Testen oder Überprüfen des Wissens von Studenten. Mehr Infos zum Aufbau und den Funktionen dieser Applikation können im [Wiki](https://github.com/mariusbackes/htw-quiz/wiki/) gefunden werden.

## Verwendete Tools und Libraries:
__node.js__  https://nodejs.org/en/  
__loopback__ https://loopback.io/  
__vue.js__ https://vuejs.org/  
__vuetifyjs__ https://vuetifyjs.com/en/  
__icons__ https://material.io/  
__mocha test framework__ https://mochajs.org/  
__sweetalert__ https://sweetalert.js.org/  

## Packages
### Packages für die App
| Package       | Beschreibung                  | Installationskommando  |
| ------------- |:----------------------------: | ----------------------:|
| vue           | Vue.js Framework              | npm install vue        |
| vue-router    | Routing for vue               | npm install vue-router |
| vuetify       | MD-Component Framework        | npm install vuetify    |
| vuetify-datetime-picker| DateTime Picker | npm install vuetify-datetime-picker|
| axios         | HTTP Requests                 | npm install axios      |
| sweetalert    | Pretty Alert for JavaScript   | npm install sweetalert |

### Packages für die API
| Package       | Beschreibung                  | Installationskommando  |
| ------------- |:----------------------------: | ----------------------:|
| loopback      | Serverinstanz                 | npm install loopback   |
| bcrypt        | Verschlüsselung               | npm install bcrypt     |

Bei der Installation von Loopback werden auch `loopback-boot`, `loopback-component-explorer` und `loopback-connector-mysql` installiert, welche das Starten des Servers, die Explorer-Oberfläche für den Browser und den Datenaustausch mit der Datenbank ermöglichen.

### Packages für die Tests
| Package       | Beschreibung                  | Installationskommando  |
| ------------- |:----------------------------: | ----------------------:|
| chai          | Assertion-Bibliothek          | npm install chai       |
| mocha         | Asynchrones Testen            | npm install mocha      |
| request       | HTTP Requests                 | npm install request    |