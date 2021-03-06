#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm use 4 | tee bk-pipeline.log
echo "--- deploy to $BUILDKITE_BRANCH" | tee bk-pipeline.log
gulp bump | tee bk-pipeline.log
npm publish | tee bk-pipeline.log
