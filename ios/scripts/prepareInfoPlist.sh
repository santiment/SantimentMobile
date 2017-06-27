#!/bin/bash
INFO_PLIST_PATH="${BUILT_PRODUCTS_DIR}/${PRODUCT_NAME}.app/Info.plist"

PLISTBUDDY="/usr/libexec/PlistBuddy"

echo "FABRIC_API_KEY = \"${FABRIC_API_KEY}\""
echo "BUGSNAG_API_KEY = \"${BUGSNAG_API_KEY}\""
echo "INFOPLIST_FILE = \"${INFO_PLIST_PATH}\""

$PLISTBUDDY -c "Remove :Fabric" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric dict" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:APIKey string ${FABRIC_API_KEY}" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:Kits array" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:Kits:0 dict" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:Kits:0:KitInfo dict" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :Fabric:Kits:0:KitName string Crashlytics" "${INFO_PLIST_PATH}"

$PLISTBUDDY -c "Remove :BugsnagAPIKey" "${INFO_PLIST_PATH}"
$PLISTBUDDY -c "Add :BugsnagAPIKey string ${BUGSNAG_API_KEY}" "${INFO_PLIST_PATH}"

echo $(${PLISTBUDDY} -c "Print :Fabric:APIKey" "${INFO_PLIST_PATH}")
echo $(${PLISTBUDDY} -c "Print :BugsnagAPIKey" "${INFO_PLIST_PATH}")
echo $(${PLISTBUDDY} -c "Print :CFBundleShortVersionString" "${INFO_PLIST_PATH}")
