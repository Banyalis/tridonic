# Docker

The E2E-tests require a custom docker image (due to Chromium and its dependencies).


## Dockerfile

The `Dockerfile` for that image is at `docker/base/Dockerfile`


## Build a new version

If modifications on the Dockerfile are necessary follow these steps:

- modify the Dockerfile
- update `.gitlab-ci.yml`
    - update `DOCKER_TAG_VERSION` with the new version number
    - update the tag of all `image:`-properties that reference to the image, with the new version number
- commit and push the changes
- run the CI-job `image/base` in the CI-pipeline
- start a new pipeline for the branch, as the previous pipeline probably has failed (since the new image hasn't been
  created yet)
