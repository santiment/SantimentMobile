#!/bin/bash

echo "FABRIC_API_KEY = \"${FABRIC_API_KEY}\""
echo "FABRIC_API_SECRET = \"${FABRIC_API_SECRET}\""

"${PODS_ROOT}/Fabric/run" ${FABRIC_API_KEY} ${FABRIC_API_SECRET}
