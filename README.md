# FDK Portal

> ⚠️ **This repository is in maintenance mode.**
> This codebase is still in use in production but is no longer receiving new features. All development efforts are 
> being migrated to [fdk-frontend](https://github.com/Informasjonsforvaltning/fdk-frontend). Critical bug fixes will 
> still be applied until migration is complete.

Web frontend for [data.norge.no](https://data.norge.no/). It includes the main web application and Nginx for reverse 
proxying. 

For a broader understanding of the system’s context, refer to the [architecture documentation](https://github.com/Informasjonsforvaltning/architecture-documentation) wiki. For more specific
context on this application, see the [Portal](https://github.com/Informasjonsforvaltning/architecture-documentation/wiki/Architecture-documentation#portal) subsystem section.

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) >=20.11.1
- [npm](https://www.npmjs.com/get-npm) >=10.8.1

### Running locally (development)

Clone the repository:

```bash
git clone https://github.com/Informasjonsforvaltning/fdk-portal.git
cd fdk-portal
```

Uncomment lines in the `src/config.js` file to enable the use of the local development environment. The lines are commented out by default to use the staging environment.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start
```

Go to http://localhost:8080

### Run locally using docker compose
```bash
docker compose up -d --build
```

Go to http://localhost:8080
