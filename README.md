# fdk-portal

Provides query and filtering capabilities for searching a collection of DCAT catalogs, concepts and information-models.

## Universal design
The design follows the WCAG 2.0 level A standard for the universal design of websites, see [WCAG 2.0](https://www.w3.org/TR/WCAG20/)

## Usage

### Build

#### Requirements
- node

```
npm install
```
### Run
```
npm run start
```

### Test
```
% npm run test
```

## Run locally with a minimal set of dependencies
```
% docker-compose up --build
```
fdk-portal's external dependencies will in this setting be realized by our staging environment.


Open your browser and point it to http://localhost:8080

## Adding new environment variables
Adding new environment variables can be done by adding them to the `src/config.js` file. The variables should also be added to the:
- config.template.js to be validated 
- docker-compose.yml for use in local development

## Optional: Fetch sample data from the staging environment
Uncomment lines 10 to 26 in the `src/config.js` file
