// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiStore: "http://localhost:3000",
  baseUrl: "https://rickandmortyapi.com/api",
  firebaseConfig: {
    apiKey: "AIzaSyDJyxVxM0_rEZy0ZZyKM7G1SUKIlTmiHkk",
    authDomain: "platzy-store-12eb7.firebaseapp.com",
    databaseURL: "https://platzy-store-12eb7-default-rtdb.firebaseio.com",
    projectId: "platzy-store-12eb7",
    storageBucket: "platzy-store-12eb7.appspot.com",
    messagingSenderId: "988558897194",
    appId: "1:988558897194:web:60abfccb0b3b89b31a5353"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
