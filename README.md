# Codebuild Test API

set the project as codebuild and assign `build.yml` as the buildspec.

name the codebuild project as CodebuildTestAPI

## Test API NodeJS

set `codebuild-test.js` as lambda nodejs function and test the function with:

```json
{
	"name": "Wei"
}
```

But testing this function, we should see codebuild environment variable been set as "Wei".

----

If the current hypothesis fails, we will need to pull the current codebuild project and set the parameter using the new variable.
