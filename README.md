# homelike Frontend Assignment

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
