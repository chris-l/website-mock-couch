<a name="about"></a>
## About Mock Couch

Mock Couch is an npm module that allows you to create an HTTP server that mocks a CouchDB server by implementing the same RESTful API.

It was desinged mostly for unit testing CouchDB based apps.

Since it is an actual HTTP server, no matter if you use libraries like cradle and nano, your code should work out of the box.

Mock Couch emit events, so you can listen to them to see the result of your test.

The project is hosted on [GitHub](https://github.com/chris-l/mock-couch). You can report bugs and discuss features on the [issues page](https://github.com/chris-l/mock-couch/issues)

<a name="installation"></a>
## Installation

Mock Couch is available as an [npm module](https://www.npmjs.org/package/mock-couch).

```
npm install --save-dev mock-couch
```

<a name="create"></a>
## Create a Mock Couch Instance

To create an instance, it's necesary to require the module, and then call the `createServer()` method.

```javascript
var mock = require('mock-couch');
```

The returned object is the **mock couch** instance, where the databases and documents should be added.

Once is that is done, its necessary to start the server by calling the `listen()` method.

<a name="createServer"></a>
### createServer `mock.createServer()`

Returns an object representing the **mock couch** instance.
```javascript
var mockCouch = mock.createServer();
```

<a name="views"></a>
### Views

Mock Couch allows to create and use views.

To create a view, just create the `_design/*` document, just like you would create any other document, but with the difference that the `map` and `reduce` functions should be created as _as regular functions_ - that is, not as strings.

This is an example:
```javascript
mockCouch.addDoc('mydatabase', {
  _id: '_design/myviews',
  views : {
    someview : {
      map : function(doc) {
        emit(null, { amount : doc._id });
      },
      reduce : function(keys, values, rereduce) {
        return values.reduce(function(a,b) {
          return a + b.amount;
        }, '');
      }
    }
  }
});
```

Then you can try the view from `http://localhost:5984/mydatabase/_design/myviews/_view/someview/`

<a name="events"></a>
## Events

**TBD** (pretty soon!)

<a name="license"></a>
## License

**MIT**
