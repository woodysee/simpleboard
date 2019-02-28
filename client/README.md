# Simple Board (Single-page application)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.2.

## Setting up environment

This single page app is set up to be hosted on Firebase.

### Getting environment variables

```shell
firebase functions:config:get --project <FIREBASE_PROJECT_ID>
```

## Angular

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build --outputPath="dist" --prod --progress=true` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. `--outputPath="dist"` will compile the Angular client app on the `dist/` folder instead of `dist/client/` folder. See [Angular build flags](https://angular.io/cli/build) and [read more about Firebase hosting](https://medium.com/@longboardcreator/deploying-angular-6-applications-to-firebase-hosting-b5dacde9c772).

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).