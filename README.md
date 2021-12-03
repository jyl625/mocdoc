# MocDoc

* [Link to live site](https://mocdoc.herokuapp.com/)

## About
* MocDoc is a ZocDoc clone where users can search for providers while filtering for provider specialtiy and type of insurance plans accepted.

## Core Feature 1 - Provider Search

* Users are able to look up real-life provider information such as their specialties, provider type, address, and NPI (National Provider Identifier) numbers. 

* Currently only filtering Medi-Cal Fee-For-Service doctors in Los Angeles, CA. 

* Dataset of providers were retrieved from [California Health and Human Services Open Data Portal](https://data.chhs.ca.gov/dataset/profile-of-enrolled-medi-cal-fee-for-service-ffs-providers/resource/a9967f81-aaa4-475e-8cd8-459dcc1be2df) on November 2021.

* Dataset of Insurance plans were retrieved from [Covered California](https://hbex.coveredca.com/data-research/), a California run health insurance exchange (also retrieved on November 2021).

* Insurance coverage information of these providers was NOT retrieved from a real-world dataset so seed data was created to simulate provider insurance coverage.

* Some data munging/cleaning was performed, resulting in ~14,000 providers in Los Angeles and 98 insurance plans.

* Randomly seeded provider to insurance plan relationship resulted in roughly 300,000 rows of data.

## Core Feature 2 - Booking Appointments

* Users are able to check if the provider is in-network or out-of-network when booking appointments.

* Appointment form checks for provider's future appointments and only shows available time slots so the provider's are not double-booked.

* Once the appointment has been made, users are able to see their appointments in their User's Page and past appointments are listed in Past Appointment Page.

* In future releases, users will be able to make reviews of their past appointments and view each provider's review and ratings

## Future Plans

* Allow users to create and edit reviews and ratings of providers

* Expand search options to include providers in California

* Add map functionality 
