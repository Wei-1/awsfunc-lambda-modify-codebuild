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
    const projname = "CodebuildTestAPI";
    
    var params = {
        names: [projname]
    };
    codebuild.batchGetProjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        var projectdata = data['projects'][0];
        console.log(projectdata);
      
        projectdata['environment']['environmentVariables'] = [
            {
                name: 'aname', /* required */
                value: aname, /* required */
                type: 'PLAINTEXT'
            }
        ];
        delete projectdata['badge'];
        delete projectdata['arn'];
        delete projectdata['created'];
        delete projectdata['lastModified'];
        codebuild.updateProject(projectdata, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
          return data;
        });
    });
};
