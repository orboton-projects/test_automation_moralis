
<!-- ABOUT THE PROJECT -->

## About the Project

Moralis Test Automation - This demo project is based on Microsoft Playwright which enables reliable end-to-end testing for modern web apps and backend API testing.

Top Features:

- Easy to Configure.
- Auto-waits for all the relevant checks to pass and only then performs the requested action.
- Records videos for Test Cases.
- Records the test script and every action on the target page is turned into generated script.
- Generates trace file, which gives in-depth details of Test Case execution.
- Execution of test case is faster when compared with other competitive framework in market.
- Supports Headful/Headless mode execution for Chrome on Windows machines. (For demo purpose, only chrome is configured)
- It supports API testing (From Playwright version 1.16 onwards)
- It has ability to produce and visually compare screenshots.
- To slow down execution slowMo option is available.
- Supports Serial and Parallel execution.
- HTML Reports are generated after execution with an option to capture screenshot/video/trace file on failure.

Bonus:
- Converts HTML Reports to Zip format which can shared across.
- Configured GitHub Actions to get triggered on pull/push actions

Note: Test file name start with "traditional" implements the traditional way of writing tests cases. Traditional tests cases are skipped as its left for demo purpose only. 

### Built With

- [Playwright](https://playwright.dev)
- [Typescript](https://www.typescriptlang.org/)
- [Moralis](https://docs.moralis.io/)

## Project Structure

This project is organized into several directories and files, each serving a specific purpose to streamline the testing process. Below is an overview of the key components:

- **`./test`**: This directory contains all the test cases. It is the central place for both API and UI tests.

- **`./test_data`**: Here, we store all the test data and schemas used across various tests. This ensures that test inputs and expected outputs are managed in a structured and consistent manner.

- **`./pageFactory/pageRepository`**: This directory is dedicated to the Page Object Model (POM) for UI tests. It includes classes and methods that represent and interact with different pages of the application, promoting code reuse and maintainability.

- **`./html-report`**: After the tests are executed, the HTML test reports are generated and stored here. These reports provide a detailed view of the test results, making it easier to analyze and debug any issues.

- **`./lib`**: This directory contains generic action classes used in both API and UI tests. These classes encapsulate common actions and utility functions to avoid code duplication and enhance test efficiency.

- **`./github/workflows`**: This directory holds GitHub workflow configurations for continuous integration and continuous deployment (CI/CD).

- **`tsconfig.json`**: This file holds the TypeScript configuration settings for the project. It ensures that the TypeScript compiler knows how to process the code, including type checking and transpilation.

- **`testConfig.ts`**: This file stores the test environment data and credentials required for running the tests. It centralizes configuration settings, making it easy to switch between different environments and manage sensitive information securely.

- **`package.json`**: This file contains the npm package dependencies and scripts for the project. It is used to manage and install the required packages and run various commands.

- **`playwright.config.ts`**: This file contains the Playwright configuration settings. It is used to set up browser options, timeouts, and other Playwright-specific configurations.

- **`global-setup.ts`**: This file is used to run global setup tasks before all tests. It can be used for tasks such as initializing databases, setting up environment variables, or performing any setup required across all tests.

- **`CustomReporterConfig.ts`**: This file is used for configuring custom reports. It allows you to define how test results should be formatted and saved.

This structure helps in organizing the project efficiently, promoting best practices in test automation, and making the codebase easy to navigate and maintain.



## Getting Started

### Prerequisites

The following software are required:

- nodejs : Download and Install Node JS from
  ```sh
  https://nodejs.org/en/download/
  ```

### Installation

1. Clone the repo using below URL

```sh
https://github.com/orboton-projects/test_automation_moralis
```

2. Navigate to folder and install npm packages using:

```sh
npm install
```
3. For first time installation run below command to download required browsers

```sh
npx playwright install
```

<!-- USAGE EXAMPLES-->

## Usage

1. For Browser Configuration, change required parameters in `playwright.config.ts`.
2. For execution entire ui test suite on all available browsers simultaneously execute below command where "ENV" can be "qa", `Test Cases are present in "test" folder`:

```JS
npm run test:ui --ENV="qa"
```

3. For executing single test case on Chrome browser execute the below command, you can change the browser for execution e.g. if you want to run test cases on Chrome, you can change `--project=Chrome` against `test:single` in `package.json`, just make sure the browser name given matches the name given in `playwright.config.ts`.

```JS
npm run test:single --ENV="qa"
```

4. For executing test cases in parallel, provide a suitable tag `@API` or `@UI` at the start of your test case name, then in `package.json` against `test:parallel` give the tag value and execute :

```JS
npm run test:parallel --ENV="qa"
```

5. For executing test cases in sequence, provide a suitable tag `@UI` at the start of your test case name, then in `package.json` against `test:serial` give the tag value and execute, `workers` parameter correspond to test cases you want to execute simultaneously e.g. `--workers=3`, executes 3 test cases simultaneously :

```JS
npm run test:serial --ENV="qa"
```

6. For executing API test cases, please provide "ENV" value as "qaApi" :

```JS
npm run test:api --ENV="qaApi" 
```

7. For recording test scripts :

```JS
npm run test:record
```
8. For HTML Report generation execute below command , single static HTML report(index.html) which can be sent via email is generated in "html-report" folder:
9. For debugging test cases add debug points, the press CNTRL+SHIFT+P and type "debug:debug npm script", on the edit box select desired script.
10. Screenshots, Videos and Trace files will be generated in test-results folder.
11. To change your username go to `testConfig.ts` and provide value against `username`
12. To change password, go to `lib/WebActions` in `decipherPassword()` uncomment `ENCRYPT` code block and replace `password` with your password, execute the test case, Encrypted password will be printed on your console . Copy Encrypted password in `testConfig.ts` against `password` field. You can comment Encrypt bloack ater this.
13. For viewing trace files, go to folder where `trace.zip` is generated and execute :
```JS
npx playwright show-trace trace.zip
```
14. You can change the Logging Message at Test Case/Test Step Level in CustomReporterConfig.ts file
15. In `tsconfig.json` file in `paths` section we can re-assign the long path imports like '../../' to a variable which starts with '@' and then we can use it to shorten our import statements in respective file.
In the below example wherever '../../pageFactory/pageRepository/' import statement is used we can replace it with '@pages'
```JS
"@pages/*":["pageFactory/pageRepository/*"]
```
16. Logging is implemented in `CustomReporterConfig.ts` using winston logger. 

First we have to create a logger object using winston.createLogger and then provid the configuration you need.
First argument is "level" for which i have provided value as "info", in winston logger every logging level is provided with a numeric value, for info the numeric value is 2, so if we provide level as info then all the logs which are equal to or less than info level will be displayed. In our case logs with error(0) and warn(1) wil also be logged. For more info on logging refer below link
`https://github.com/winstonjs/winston#logging`

Second we have to provide format for the log file generate I have provided format as json using ` winston.format.json()` because JSON is widely used. There are various levels like printf, simple, colorize which you can refer in below link
`https://github.com/winstonjs/logform#formats` 

Third part is transports which defines where the log file will be written. I have provided the location as `logs/info.log` in my case

Once logger object is created I have provided `logger.add(console);` which instructs logger to write the log files in console as well.

Once logger object is created you can use this instead of console.log in your framework and these logs will be written both in your console and log file.

17. UI mode in Playwright is lets you explore, run and debug tests, it comes with a built-in watch mode. It opens like Traceviewer where you can use the window to find selectors, its directly integrated to VS Code, all the browsers definned in playwright config will be automatically picked up and you can chosse to run individual test cases in browser of choice and also we can run tests directly from UI mode instead of IDE. I have used the tag `@UI` in `test:ui` section of package.json, because all my UI test cases are tagged with `@UI` tag and we want to run only Web based test cases. To use UI mode use below command with `ENV` value of your choice
```JS
npm run test:ui --ENV="qa"
```
18. GitHub Actions is configured in `.github/workflows/playwright.yml` file and events(trigger points) are set to pus/pull actions on master branch. Changes in command to run test cases can be made in "Run tests" section in this file.

## Reports
Sample HTML Report ScreenShots
![alt text](image.png)

