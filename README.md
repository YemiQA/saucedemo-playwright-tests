# SauceLabs UI Automation Framework

E-Commerce UI test automation for [saucedemo.com](https://saucedemo.com), built with Playwright (JavaScript) following the Page Object Model (POM) pattern.

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org) and [Java](https://www.oracle.com/uk/java/technologies/downloads/)

```bash
# Clone the repo
git clone https://github.com/YemiQA/saucedemo-playwright-tests.git
cd saucedemo-playwright-tests

# Install dependencies and browsers
npm install
npx playwright install
```

## Running the Tests

```bash
# Run all tests on all browsers
npx playwright test

# Run on a single browser
npx playwright test --project=chromium

# Run in headed mode
npx playwright test --headed

# Open the HTML report
npx playwright show-report
```

## Author

Olayemi Ojo
