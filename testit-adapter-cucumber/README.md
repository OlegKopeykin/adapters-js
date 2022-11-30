# Test IT TMS adapters for JavaScript
![Test IT](https://raw.githubusercontent.com/testit-tms/adapters-js/master/images/banner.png)

# Cucumber

## Getting Started

### Installation
```
npm install testit-adapter-cucumber
```

## Usage

### API client

To use adapter you need to install `testit-api-client`:
```
npm install testit-api-client
```

### Configuration

#### File

1. Create `testitFormatter.js` file in the root directory of the project:
		```js
		const { TestItFormatter } = require('testit-adapter-cucumber');

		module.exports = class CustomFormatter extends TestItFormatter {
			constructor(options) {
				super(options, {
					url: '<url>',
					privateToken: '<token>',
					projectId: '<id>',
					configurationId: '<id>',
					testRunId: '<optional id>',
					testRunName: '<optional name>',
					adapterMode: '<optional>'
				});
			}
		};
		```
2. Fill parameters with your configuration, where:  
    * `URL` - location of the TMS instance  
      
    * `privateToken` - API secret key
        1. go to the https://{DOMAIN}/user-profile profile
        2. copy the API secret key
    
    * `projectId` - ID of project in TMS instance.
    
        1. create a project
        2. open DevTools -> network
        3. go to the project https://{DOMAIN}/projects/{PROJECT_GLOBAL_ID}/tests
        4. GET-request project, Preview tab, copy id field  
    
    * `configurationId` - ID of configuration in TMS instance.
    
        1. create a project  
        2. open DevTools -> network  
        3. go to the project https://{DOMAIN}/projects/{PROJECT_GLOBAL_ID}/tests  
        4. GET-request configurations, Preview tab, copy id field  
    
    * `testRunId` - id of the created test run in TMS instance. `testRunId` is optional. If it is not provided, it is created automatically.  
      
    * `testRunName` - parameter for specifying the name of test run in TMS instance. `testRunName` is optional. If it is not provided, it is created automatically.   
    
    * `adapterMode` - adapter mode. Default value - 0. The adapter supports following modes:  
        
        * 0 - in this mode, the adapter filters tests by test run ID and configuration ID, and sends the results to the test run.
        * 1 - in this mode, the adapter sends all results to the test run without filtering.
        * 2 - in this mode, the adapter creates a new test run and sends results to the new test run.

3. Add to `cucumber.js` file:

		```js
		module.exports = {
			default:
				'-f ./testitFormatter.js',
		};
		```

#### ENV

You can use environment variables (environment variables take precedence over file variables):

* `TMS_URL` - location of the TMS instance.
  
* `TMS_PRIVATE_TOKEN` - API secret key.
  
* `TMS_PROJECT_ID` - ID of a project in TMS instance.
  
* `TMS_CONFIGURATION_ID` - ID of a configuration in TMS instance.

* `TMS_ADAPTER_MODE` - adapter mode. Default value - 0.
  
* `TMS_TEST_RUN_ID` - ID of the created test-run in TMS instance. `TMS_TEST_RUN_ID` is optional. If it is not provided, it is created automatically.
  
* `TMS_TEST_RUN_NAME` - name of the new test-run.`TMS_TEST_RUN_NAME` is optional. If it is not provided, it is created automatically.
  
* `TMS_CONFIG_FILE` - name of the configuration file. `TMS_CONFIG_FILE` is optional. If it is not provided, it is used default file name.

#### Command line

You also can CLI variables (CLI variables take precedence over environment variables):

* `tmsUrl` - location of the TMS instance.
  
* `tmsPrivateToken` - API secret key.
  
* `tmsProjectId` - ID of a project in TMS instance.
  
* `tmsConfigurationId` - ID of a configuration in TMS instance.

* `tmsAdapterMode` - adapter mode. Default value - 0.

* `tmsTestRunId` - ID of the created test-run in TMS instance. `tmsTestRunId` is optional. If it is not provided, it is created automatically.
  
* `tmsTestRunName` - name of the new test-run.`tmsTestRunName` is optional. If it is not provided, it is created automatically.
  
* `tmsConfigFile` - name of the configuration file. `tmsConfigFile` is optional. If it is not provided, it is used default file name.

#### Examples

Launch with a `testitFormatter.js` file in the root directory of the project:

```
$ npm run test
```

Launch with command-line parameters:

```
$ npm run test tmsUrl=<url> tmsPrivateToken=<token> tmsProjectId=<id> tmsConfigurationId=<id> tmsTestRunId=<optional id> tmsTestRunName=<optional name>
```

### Tags

Formatter provides additional methods to World:

- addMessage - adds message to autotest
- addLinks - adds links to autotest
- addAttachments - uploads specified to Test IT and links to test run

```js
When('Something happens', function () {
	this.addMessage('💔');
	this.addLinks([
		{
			url: 'http://github.com',
		},
		{
			url: 'https://wikipedia.org',
			title: 'Wikipedia',
			description: 'The free encyclopedia',
			type: 'Related',
			hasInfo: true,
		},
	]);
	this.addAttachments(['path/to/file.txt']);
});
```

Cucumber tags can be used to specify information about autotest.

> Only those specified above the `Scenario` are taken into account

- `@ExternalId` - Unique identifier of autotest (Required)
- `@Title` - Title that is displayed on autotest page
- `@DisplayName` - Name that is displayed in autotests table
- `@Description` - Autotest description
- `@Link` - can be specified either in JSON (`@Link={"url":"http://google.com","hasInfo":true,"description":"GoogleDescription","title":"Google","type":"Defect"}`) or in text (`@Link=http://google.com`)
- `@Label` - Label that is going to be linked to autotest
- `@WorkItemId` - Work item's ID to which autotest is going to be linked

### Examples

#### Tags
```
Feature: Tags
	@DisplayName=GoogiliGoogle
	@Description=Cannot_Write_With_Spaces
	@ExternalId=344
	@Link=http://google.com
	@Link=http://vk.com
	@Label=Maths
	@Label=School
	Scenario: Scenario with links
		When 2+2
		Then Result is 4
	@Title=LINKS
	@ExternalId=343
	@Link={"url":"http://google.com","hasInfo":true,"description":"GoogleDescription","title":"Google","type":"Defect"}
	Scenario: Scenario with link obj
		When 2+2
		Then Result is 4
```

#### Parameterized test
```
Feature: Rule
	Tests that use Rule
	@ExternalId=999
	Scenario: Summing
		When <left>+<right>
		Then Result is <result>

		Examples: Options
			Examples show different options
			| left | right | result |
			| 1    | 1     | 3      |
			| 9    | 9     | 18     |
```

# Contributing

You can help to develop the project. Any contributions are **greatly appreciated**.

* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/testit-tms/adapters-js/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/testit-tms/adapters-js/blob/master/CODE_OF_CONDUCT.md) before posting your first idea as well.

# License

Distributed under the Apache-2.0 License. See [LICENSE](https://github.com/testit-tms/adapters-js/blob/master/LICENSE.md) for more information.

