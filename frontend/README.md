# Resourcenter Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.2

## Get started

### Requirements

- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/downloads)
- [NodeJs](https://nodejs.org/en/)
- [Angular CLI](https://angular.io/cli)

### Clone the repo

```shell
git clone https://github.com/marcode24/ResourCenter
cd Resourcenter/frontend
```

### Install npm packages

Install the `npm` packages described in the `package.json` and verify that it works.

```shell
npm install
ng serve -o
```

Shut it down manually with `Ctrl+C`

## Environments

| Name       | URL                                                                    | PORT |
| ---------- | ---------------------------------------------------------------------- | ---- |
| Localhost  | [localhost](http://localhost:4200)                                     | 4200 |
| Production | [https://resourcenter.netlify.app/](https://resourcenter.netlify.app/) |

## Folder Structure

    .
    ├── src
    │ ├── app                 # Source code application
    │ │ ├── core              # Module as a singleton
    │ │ │ ├── components
    │ │ │ ├── constants
    │ │ │ ├── guards
    │ │ │ ├── interfaces
    │ │ │ ├── models
    │ │ │ ├── pipes
    │ │ │ ├── services
    │ │ │ └── utils
    │ │ ├── features          # Module for features which compose the application
    │ │ ├── shared            # Module for components shared between application modules
    │ │ │ ├── components
    │ ├── assets              # Styles, images, icons, fonts etc
    │ ├── environments        # Config by environment (localhost and production)
    │ └── styles              # Global styles
    └── README.md
