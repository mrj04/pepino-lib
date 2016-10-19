#!/bin/bash

set -eo pipefail
echo "--- deploy to $BUILDKITE_BRANCH" | tee bk-pipeline.log
npm publish | tee bk-pipeline.log
cd .. | tee bk-pipeline.log
rm -rf pepino-demo | tee bk-pipeline.log
git clone git@github.com:AcklenAvenue/pepino-demo.git | tee bk-pipeline.log
cd pepino-demo | tee bk-pipeline.log
git commit --allow-empty -m "empty commit" | tee bk-pipeline.log
heroku git:remote -a pepino-demo | tee bk-pipeline.log
git push heroku develop:master | tee bk-pipeline.log
