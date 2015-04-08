//select all : curl -H "X-Auth-Token: undefined" http://localhost:3000/collectionapi/players
//select single : curl -H "X-Auth-Token: undefined" http://localhost:3000/collectionapi/players/kde8fiXESfPQEfnkN
//insert : curl -H "X-Auth-Token: undefined" -d "{\"id\": 2, \"name\": \"John Smith2\"}" http://localhost:3000/collectionapi/players
//update : curl -H "X-Auth-Token: undefined" -X PUT -d "{\"\$set\":{\"name\":\"Alisson\"}}" http://localhost:3000/collectionapi/players/JSY5gHgKsQSBBSGDd
//delete : curl -H "X-Auth-Token: undefined" -X DELETE http://localhost:3000/collectionapi/players/JSY5gHgKsQSBBSGDd

Meteor.startup(function () {
  var collections = [];

  collectionApi = new CollectionAPI({
    authToken: '97f0ad9e24ca5e0408a269748dgetup',               // Require this string to be passed in on each request
    apiPath: 'collectionapi',                                   // API path prefix
    standAlone: false,                                          // Run as a stand-alone HTTP(S) server
    allowCORS: false,                                           // Allow CORS (Cross-Origin Resource Sharing)
    sslEnabled: false,                                          // Disable/Enable SSL (stand-alone only)
    listenPort: 3005,                                           // Port to listen to (stand-alone only)
    listenHost: undefined,                                      // Host to bind to (stand-alone only)
    privateKeyFile: 'privatekey.pem',                           // SSL private key file (only used if SSL is enabled)
    certificateFile: 'certificate.pem'                          // SSL certificate key file (only used if SSL is enabled)
  });

  collections[0] = [Notify, Program, Content, User, Publicity, Poll, Answer];
  collections[1] = ['notify', 'program', 'content', 'user', 'publicity', 'poll', 'answer'];
  for(var i in collections[0]){
    collectionApi.addCollection(collections[0][i], collections[1][i], {
      authenticate: function(token, method, requestMetadata) {
        return (token !== undefined)? true : false;
      },
      methods: ['GET'],  
      before: { 
        GET: function (objs, requestMetadata, returnObject) {
          returnObject.success = true;
          returnObject.statusCode = 200;
          var filteredObjs = [];
          objs.forEach(function(obj) {
            if (!obj.hasOwnProperty("_del") || obj._del === false) {
              filteredObjs.push(obj);
            }
          });
          returnObject.body = {
            method: 'GET',
            objs: filteredObjs
          };
          return true;
        }
      },
      after: {
        GET: undefined
      }
    });
  }
  collectionApi.start();
});
