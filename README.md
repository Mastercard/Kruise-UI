# Kruise Deployment Wizard

The Kruise Wizard is a tool that streamlines the creation of initial deployment manifests for complex Kubernetes applications. Development and traditional Ops teams can now use a wizard-like tool to define application deployments and generate a set of Kustomized based YAML files. These files are committed to a Git repository allowing seamless GitOps adoption. Kustomized based Kubernetes deployments can then be deployed utilizing a variety of CD tools as in our case: ArgoCD.

## What it does

The Kruise Wizard is a web application that has a wizard-like user interface (git ref here) and API (git ref here) that allows Development and Operation teams to define a set of YAML manifests for applications deployment in Kubernetes. The wizard points to a GIT repository where it commits the YAML files and generate a Kustomize based overlay for easy modifications and different environments adjustments (think development vs. production environment requirements). The Kruise Wizard provides a simple yet powerful user interface to guide the application deployer to all the steps required to successfully deploy an application in Kubernetes. Moreover, the wizard takes a top-bottom approach starting from the definition of the higher constructs, like services and ingress controllers to then move into the container(s) and volume(s) definitions. The wizard also encapsulates good deployment practices like the use of a Service Account and performs output validation. The wizard is an opinionated and configurable tool where corporate security and operations can enforce certain options to ensure increased security as well as company-wide deployment consistency. Among these, for instance, there are: RollingUpgrade strategies, control over the minimum number of instances deployed and ImagePull strategies and Image locations as well as versioning.

## Why it matters

At Mastercard, as well as in many other companies, development teams and operations teams are still separate and have different responsibilities. Operations teams have a great knowledge on how to run at scale applications but now are facing increasing pressure on moving these applications to cloud native environments like Kubernetes. This creates a fraction within the company where the Development teams are pushing to move applications to the cloud native environments whereas Operations are resisting. The main reason is the complexity of defining an application in the new environment and set all the correct parameters for scaling and upgrading. Security and governance are also concerned with the inconsistency of deployment models when these are tackled by Operations teams with different Kubernetes knowledge and experience. A wizard-like tool can not only guide the Operation teams to speed-up learning and adoption of Kubernetes but also ensure deployment principles and constructs consistency across the various applications.


# UI

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
