#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use 4 | tee bk-pipeline.log
echo "--- deploy to $BUILDKITE_BRANCH" | tee bk-pipeline.log
gulp bump | tee bk-pipeline.log
npm publish | tee bk-pipeline.log
cd .. | tee bk-pipeline.log
rm -rf pepino-demo | tee bk-pipeline.log
git clone git@github.com:AcklenAvenue/pepino-demo.git | tee bk-pipeline.log
cd pepino-demo | tee bk-pipeline.log
git reset HEAD~ | tee bk-pipeline.log
heroku git:remote -a pepino-demo | tee bk-pipeline.log
git push -f heroku develop:master | tee bk-pipeline.log
