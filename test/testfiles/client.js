buster.testCase("Client", {

  "init": function(){

    var s = new Stretchr.Client("proj", "pub");
    assert.equals(s.projectName(), "proj");
    assert.equals(s.apiKey(), "pub");

  },

  "at": function(){

    var client = new Stretchr.Client("proj", "key");
    var request = client.at("/path/to/something");

    refute.equals(undefined, request, "at() should return a request.")

    assert.equals(client, request.client())
    assert.equals("/path/to/something", request.path())

  },

  "getTransport": function(){

    var client = new Stretchr.Client("proj", "key");
    var t = client.transport();

    assert.equals(t.client(), client);
    assert.equals(t.$class, Stretchr.JSONPTransport);

  }

});
