<h2 id="about">About Mock Couch</h2>

Mock Couch is an npm module that allows you to create an HTTP server that mocks a CouchDB server by implementing the same RESTful API.

It was desinged mostly for unit testing CouchDB based apps.

Since it will create an actual HTTP server, no matter if you use libraries like cradle or nano, your code should work out of the box.

Mock Couch will emit events, so you can listen to them to see the result of your test.

Mock Couch is still under constant development, however it can already be used the way it is right now.

The project is hosted on [GitHub](https://github.com/chris-l/mock-couch).

Mock Couch is not attempting to fully implement CouchDB, but only the features necessary for unit testing CouchDB based apps.

However, if there is a feature you need for your tests, feel free to add a feature request!

You can report bugs and discuss features on the [issues page](https://github.com/chris-l/mock-couch/issues)

<h2 id="installation">Installation</h2>

Mock Couch is available as an [npm module](https://www.npmjs.org/package/mock-couch).

```
npm install --save-dev mock-couch
```

<h2 id="create">Create a Mock Couch Instance</h2>

To create an instance, it's necesary to require the module, and then call the `createServer()` method.

```javascript
var mock = require('mock-couch');
```

The returned object is the **mock couch** instance, where the databases and documents should be added.

Once is that is done, its necessary to start the server by calling the `listen()` method.

<h3 id="createServer">createServer
  <code>mock.createServer()</code>
</h3>

Returns an object representing the **mock couch** instance.
```javascript
var mockCouch = mock.createServer();
```

<h2 id="methods">Instance Methods</h2>

Each **mock couch** instance has the following methods:

<h3 id="listen">listen
  <code>mockCouch.listen([port], arguments*)</code>
</h3>

Start listening HTTP request at the specified port. If no port was specified, it uses `5984` by default.

This function calls the `listen` function from restify with any arguments you pass to it.

```javascript
mockCouch.listen(5984, function() {});
```

<h3 id="close">close
  <code>mockCouch.close()</code>
</h3>

Closes the HTTP server.

This function calls the `close` function from restify.

```javascript
mockCouch.close();
```

<h3 id="addDB">addDB
  <code>mockCouch.addDB(database name, [docs])</code>
</h3>

Add a new database to the **mock couch** instance, and returns the database object.

The first argument is the name of the database. Optionally you can use a second argument with an array, containg JavaScript objects, being each object a document in the database.

```javascript
var peopleDb = mockCouch.addDB('people', [
  { _id : 'first', value : 1 },
  { _id : 'second', value : 2 }
]);
peopleDb.first.value === 1; // true
```

<h3 id="addDoc">addDoc
  <code>mockCouch.addDoc(database name, doc)</code>
</h3>

Add a document to the specified database, and returns an object containing the `id` and the `_rev`.

The first argument is the name of the database (required). The second argument is an object containing the database (required).

If the document includes a `_id` or `_rev` properties, it will use them. Otherwise, it will create random ones for it.

```javascript
var result = mockCouch.addDoc('people', { _id : 'third', value : 3 });
result.id === 'third'; // true
```

<h2 id="properties">Instance Properties</h2>

Each **mock couch** instance has the following properties:

<h3 id="databases">databases
  <code>mockCouch.databases</code>
</h3>

Each **mock couch** instance has a `databases` public property which is an object and, just like its name indicates, contains the databases of that instance.

#### Properties

Each database is an object, where each property is a document of the database.

The database object has the following properties with information about the database:

* `__doc_count` : Return the number of documents in the database.

<h2 id="views">Views</h2>

Mock Couch allows to create and use views.

To create a view, just create the `_design/*` document, with either [addDoc](#addDoc) or [addDB](#addDB).
                                            
Make sure that the `map` and `reduce` functions are created as _as regular functions_ - that is, **not as strings**.

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

<h2 id="events">Events</h2>

Each HTTP request emit an event when is responded.

**The name of the emitted event is the HTTP method of the request** (that is, the name can be GET, POST, PUT or DELETE), and the passed argument is an object that have details about the processed request.

The properties of the object passed to each event are the following:

### GET _all_dbs

* `type` *String* The value `_all_dbs`.
* `databases` *Array* A list with the names of the databases.

### GET / POST _all_docs

* `type` *String* The value `_all_docs`.
* `database` *String* Name of the database.
* `rows` *Array* A list with the rows from the database.

### POST _bulk_docs

* `type` *String* The value `_bulk_docs`
* `docs` *Array* A list with the docs that just been inserted.

### DELETE database

* `type` *String* The value `database`
* `database` *String* The name of the deleted database

### DELETE document

* `type` *String* The value `document`
* `id` *String* The id of the deleted document

### GET document

* `type` *String* The value `document`
* `id` *String* The id of the requested document
* `doc` *Object* The requested document

### GET / POST view

* `type` *String* The value `view`
* `name` *String* The name of the design document
* `group` *Boolean* Is grouping being used?
* `reduce` *Boolean* Is reduce being used?
* `database` *String* The name of the database
* `view` *String* The name of the view processed
* `output` The result of view functions (map and optionally, reduce)

### PUT database

* `type` *String* The value `database`
* `database` *String* The name of the database

### PUT / POST document

* `type` *String* The value `document`
* `id` *String* The name of the document
* `doc` *Object* The document

<h2 id="license">License</h2>

**MIT**
