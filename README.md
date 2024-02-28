# Project MongoDB

This is a simple MongoDB project that demonstrates the use of MongoDB's aggregation framework and geospatial queries. The project includes scripts for creating collections with validation schemas, inserting mock data, and running an aggregation pipeline.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Node.js
npm
MongoDB

### Installing

1. Clone the repository:
`git clone https://github.com/GroovyHooked/mongo-project.git`

2. Navigate to the project directory:
`cd mongo-project`

3. Install the dependencies:
`npm install`

### Usage

1. Create the collections:
`npm run init`

This will run the createCollections function from model.js which creates the "Users" and "Stuffs" collections with validation schemas.

2. Insert mock data:
`npm run migrate`

This will run the migrationScript function from migration.js which inserts mock data into the "Users" and "Stuffs" collections.

3. Run the aggregation pipeline:
`npm run aggregate`

This will run the aggregationScript function from aggregation.js which runs an aggregation pipeline on the "Users" collection and outputs the result.

## Built With

Node.js

MongoDB