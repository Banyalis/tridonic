# Tests

As a test-framework, we use [Jest](https://jestjs.io/) for unit/functional- as well as E2E-tests.

## Unit/functional-tests

The unit/functional-tests shall be placed into `test/unit/specs`.


## E2E tests

### Create a new test

To create new E2E-test scenarios, we use [QA Wolf](https://docs.qawolf.com/).
See also [Create a test](https://docs.qawolf.com/docs/create_a_test).

To create a new test, make first sure that the nuxt-server is running:

```bash
npm run dev
```
 
then execute the following command (replace `NAME_OF_TEST_SUITE` with the name of the test-suite, eg.
`all-products`):

```bash
npm run create-e2e-test -- NAME_OF_TEST_SUITE
```

The test-suites will be available in `test/unit/specs`.


## Run the tests

There are two modes:

- Dev: In dev-mode, a separate mockserver and nuxt-server has to be started
- CI: In CI-mode, a mockserver and nuxt-server will be started, but a built version has to be available

### Dev-mode

Start the mockserver:

```bash
npm run mockserver
```

Run nuxt in dev-mode:

```bash
npm run dev
```

Run the tests:

```bash
npm run test-dev
```

### CI-mode

Build the app first:

```bash
npm run build
```

Run the tests

```bash
npm run test-ci
```
