# toastdos-front
The front end system for the GOAT community annotation tool

Usage
----
It is assumed that you have **NodeJS v6.0+** and the **corresponding NPM verion** installed.

When you first clone the repo you will need to do `npm install` to install the dependencies.

To start the development server run `npm start`.

The development client expects there to be a backend server running locally in port 3000. If you want, you can run the client with mock API calls by setting the MOCK_API environment variable to true.

`MOCK_API=true npm start`

Project Structure
----
There are a number of subdirectories within the application structure.

- **bin/**
   - This directory gets created when the app is built. The result ends up in here. In a production environment, these files would be statically served.
- **src/**
	- **index.ejs**
		- EJS template that the root HTML page gets built on top of.
	- **index.js**
		- Entry point for the JavaScript application
	- **js/**
		- **modules/**
			- This directory contains the independent, feature oriented modules. The modules separate various parts of the application.
			- **myModule/**
				- A sample module
				- **components/**
					- All react components specific to this module should be defined here.
				- **actions.js**
					- This is where the redux action creators for this module are defined.
				- **actionTypes.js**
					- This is where the specific redux action types for this module should be defined.
				- **constants.js**
					- Any module constants should be defined here. Notably the module name.
				- **reducer.js**
					- This is where the redux reducer for this module is implemented. It should handle the actions defined in this module's `actionTypes.js`.
				- **index.js**
					- This is where the interface for this module is defined. In this file you explicitly export any action types, react components, etc. from this module so other modules can use them. You should have a single object be the default export. This way other modules will simply require the directory name and the this index file will determine what that does. Typically you would want to export the module name (from the constants), the reducer so that it can be combined in the top level root reducer, and the top-level component that your app would need to place somewhere.
		- **lib/**
			- This is where any files/components that don't fit within any of the explicitly created modules should go. 
	- **app.jsx**
		- Root React Component that the rest of the components are built on top of.
	- **store.js**
		- The Redux store. The various reducers are combined here.