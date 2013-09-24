buster.testCase("Client", {

  "init": function(){

    var s = new Stretchr.Client("proj", "pub");
    assert.equals(s.projectName(), "proj");
    assert.equals(s.apiKey(), "pub");
    assert.equals(s.host(), "proj.stretchr.com");
    assert.equals(s.protocol(), "http");
    assert.equals(s.apiVersion(), "1.1");

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

  },

  "url": function(){

    var client = new Stretchr.Client();
    client.setHost("monkey.something.com");
    client.setProtocol("http");
    client.setApiVersion(1.1);

    var u = client.url("/people/1?name=Ryan");
    assert.equals(u, "http://monkey.something.com/api/v1.1/people/1?name=Ryan")

    var u = client.url("people/1?name=Ryan");
    assert.equals(u, "http://monkey.something.com/api/v1.1/people/1?name=Ryan")

  }

});
