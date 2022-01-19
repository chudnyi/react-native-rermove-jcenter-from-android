## Step 01

- block jcenter.bintray.com via hosts 
- ./gradlew assembleProductionRelease --refresh-dependencies

## Step 02
- Replace jcenter() to gradlePluginPortal() in all project includes node_modules
