var AWS = require('aws-sdk');
AWS.config.apiVersions = {
    codebuild: '2016-10-06',
    // other service API versions
};
var codebuild = new AWS.CodeBuild();

console.log('Loading function');

exports.handler = (event, context) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    // get s3 data from datalake s3 trigger event
    const aname = event.name;
    console.log('The name', aname);

    // fpc-tw/quality-prediction/brvcm/fpc-usa/target/lims/csv/2020/01/01/FLBR_VCM_QC_NT503_20180101_20200601.csv
    var params = {
      name: 'CodebuildTestAPI', /* required */
      environment: {
        environmentVariables: [
          {
            name: 'aname', /* required */
            value: aname, /* required */
            type: 'PLAINTEXT'
          }
        ]
      }
    };
    codebuild.updateProject(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
      return data;
    });
};
