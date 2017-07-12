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
echo "ENVIRONMENT_FILE_PATH = \"${ENVIRONMENT_FILE_PATH}\""
. "${ENVIRONMENT_FILE_PATH}"

# Output for debug purposes
echo "ENVIRONMENT_TYPE = \"${ENVIRONMENT_TYPE}\""
echo "FABRIC_API_KEY = \"${FABRIC_API_KEY}\""
echo "BUGSNAG_API_KEY = \"${BUGSNAG_API_KEY}\""

# Path to plistbuddy
PLISTBUDDY="/usr/libexec/PlistBuddy"

# Path to info plist file
INFO_PLIST_PATH="${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/Info.plist"
echo "INFOPLIST_FILE = \"${INFO_PLIST_PATH}\""

# Add Fabric instructions to info plist file
$PLISTBUDDY -c "Remove :Fabric" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric dict" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:APIKey string ${FABRIC_API_KEY}" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:Kits array" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:Kits:0 dict" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:Kits:0:KitInfo dict" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:Kits:0:KitName string Crashlytics" "${INFO_PLIST_PATH}"

# Add Bugsnag instructions to info plist file
$PLISTBUDDY -c "Remove :BugsnagAPIKey" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :BugsnagAPIKey string ${BUGSNAG_API_KEY}" "${INFO_PLIST_PATH}"

# Output for debug purposes
echo $(${PLISTBUDDY} -c "Print :Fabric:APIKey" "${INFO_PLIST_PATH}")
echo $(${PLISTBUDDY} -c "Print :BugsnagAPIKey" "${INFO_PLIST_PATH}")
echo $(${PLISTBUDDY} -c "Print :CFBundleShortVersionString" "${INFO_PLIST_PATH}")
