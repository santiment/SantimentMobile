#!/bin/bash

# Read preprocessor definitions
eval "${GCC_PREPROCESSOR_DEFINITIONS}"

# Obtain path to environment file
if [ ${IS_PRODUCTION_BUILD} == 1 ]; then
    ENVIRONMENT_FILE_PATH="../app/config/production.env"
elif [ ${IS_STAGING_BUILD} == 1 ]; then
    ENVIRONMENT_FILE_PATH="../app/config/staging.env"
else
    ENVIRONMENT_FILE_PATH=""
fi

# Read environment file
. "${ENVIRONMENT_FILE_PATH}"

# Launch Fabric
echo "Launching Fabric with API key \"${FABRIC_API_KEY}\" and API secret \"${FABRIC_API_SECRET}\""
"${PODS_ROOT}/Fabric/run" ${FABRIC_API_KEY} ${FABRIC_API_SECRET}
