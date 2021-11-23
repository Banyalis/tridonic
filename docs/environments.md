# Environments

This project will be run/developed in different environments. In order to keep it flexible, these environment-dependent
values, will be set as environment variables, which also will be utilized by the CI-pipeline to build the project for
the target-environment.

## Environment variables

To set environment-variables for a npm-task, simple prepend the command with the key/value. eg:

```json
{
  "scripts": {
    "dev": "SERVICE_URL='http://localhost:8081' nuxt"
  }
}
```

Used environment-variables:

- `SERVICE_URL`: The base-URL to the backend service endpoints (eg. `https://www-uat.tridonic.com/api/0`)
    - For the local use, it points to a locally running mockserver (`http://localhost:8081`)
