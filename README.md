## Step 01

- block jcenter.bintray.com via hosts
```
0.0.0.0 jcenter.bintray.com
```
- ./gradlew assembleProductionRelease --refresh-dependencies

## Step 02
- Replace jcenter() to gradlePluginPortal() in all project includes node_modules

## Step 03 (check)
- revert changes in node_modules: 66 matches of jcenter()

