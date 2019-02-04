# Homelike client for assignment

## Background information

### installation & run
1. start the server in the `../server` folder
1. start the client:
    - npm i
    - npm start

## What to do
1. Invest some time to refactor the current code and make it better
    - please also tell us what you did
1. Add webpack
1. Add information about owner to apartment view page
1. Add new page "Locations", show the apartments filtered by location
1. Add new page "search page", provide abilities to search by location and filter by [size, price, amenities, details, services]

**important**: _there is no need to change any "server" lines of code to complete this assignment_

### Changes
App.js 
instaed of div use of switch to render other routes

HomeView.js and ApartmentView.js
use of componenentdidmount instead componentwillmount

ApartmentTileView.js
anchor tag replace with Link tag of react router dom
remove let image used const

ApartmentAminititesView.js
refractor code [avoid array.push  and use filter and map]

null checks reAjusted for loading... text.

Backend code change required to access location field

header from index.html moved to layout.js so that while clicking on logo it will not reload the page and search filter will be maintained.

### assignment work

Owner email id has been provided to apartmentView.js

#### location View
To create location based view
I have provided link for location based search on apartmentTileView.js,so user can click on Location and check the location based apartments.
Technical approach : Created the selector apartment.selector.js and Reuse HomeView.js Component


#### filters
Filter Working
default every filter consider as select with all value

After Apply filter [it works as per sequence]
filterA && FilterB && FilterC...
(filterAa || FilterAb) && (FilterBa || FilterBb) && FilterC...

in case one filter not selected in sequence then i have consider as all value selected in that filter
FilterB && FilterC


#### Refinments In complete
Unable to compete following refinements
searchFilter on each page will work if i change approach with search button
and remove filter button on filter label so that user can directly clear the filter clicking on label on it.
test cases

#### webpack
not change webpack file as project is with create-react-app

Before run the project
npm install as i have installed some dependencies
