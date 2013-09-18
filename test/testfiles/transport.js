var TestFileValue = 0;

buster.testCase("JSONPTransport", {

  "Transport.url": function(){

    var t = new Stretchr.Transport();
    t.setHost("monkey.something.com");
    t.setProtocol("http");
    t.setAPIVersion(1.1);

    var u = t.url("/people/1?name=Ryan");

    assert.equals(u, "http://monkey.something.com/api/v1.1/people/1?name=Ryan")

  },

  "JSONPTransport.makeRequest": function(){

    var s = new Stretchr.Session();
    var t = new Stretchr.JSONPTransport(s);
    var options = {
      path: "testfiles/includes/IncreaseTestFileValueByOne.js"
    };

    var eventCallbacks = [];

    // bind some events
    t.before(function(){
      eventCallbacks.push("before");
    });
    t.after(function(){
      eventCallbacks.push("after");
    });
    t.error(function(){
      eventCallbacks.push("error");
    });
    t.success(function(){
      eventCallbacks.push("success");
    });

    t.makeRequest(options);

    assert.equals(1, eventCallbacks.length, "before event should get called")

    // call the callback
    response = {
      "~status": 200,
      "~data": {
        "name": "Mat"
      }
    };
    window[t.lastCallbackFunctionName](response);

    assert.equals(3, eventCallbacks.length, "after event should get called")

    assert.equals(eventCallbacks[0], "before");
    assert.equals(eventCallbacks[1], "success");
    assert.equals(eventCallbacks[2], "after");

    window.setTimeout(function(){
      assert.equals(TestFileValue, 2);
    }, 500);

  },

  "JSONPTransport.makeRequest errors": function(){


    var s = new Stretchr.Session();
    var t = new Stretchr.JSONPTransport(s);
    var options = {
      path: "testfiles/includes/IncreaseTestFileValueByOne.js"
    };

    var eventCallbacks = [];

    // bind some events
    t.before(function(){
      eventCallbacks.push("before");
    });
    t.after(function(){
      eventCallbacks.push("after");
    });
    t.error(function(){
      eventCallbacks.push("error");
    });
    t.success(function(){
      eventCallbacks.push("success");
    });

    t.makeRequest(options);

    assert.equals(1, eventCallbacks.length, "before event should get called")

    // call the callback
    response = {
      "~status": 500,
      "~errors": [{
        "~message": "Something went wrong"
      }]
    };
    window[t.lastCallbackFunctionName](response);

    assert.equals(3, eventCallbacks.length, "after event should get called")

    assert.equals(eventCallbacks[0], "before");
    assert.equals(eventCallbacks[1], "error");
    assert.equals(eventCallbacks[2], "after");

    window.setTimeout(function(){
      assert.equals(TestFileValue, 2);
    }, 500);

  }

});
