Mock Couch is an npm module that allows you to create an HTTP server that mocks a CouchDB server by implementing the same RESTful API.

It was desinged mostly for unit testing CouchDB based apps.

Since it is an actual HTTP server, no matter if you use libraries like cradle and nano, your code should work out of the box.

Mock Couch emit events, so you can listen to them to see the result of your test.

The project is hosted on [GitHub](https://github.com/chris-l/mock-couch). You can report bugs and discuss features on the [issues page](https://github.com/chris-l/mock-couch/issues)

<a name="installation"></a>
## Installation

```
npm install --save-dev mock-couch
```

## Features

* Implemented with [restify](https://github.com/mcavage/node-restify).
* Uses simple JavaScript objects as documents.
* It emit events, so the tests can listen to them.
* The `mock_couch` object has a `databases` public property, to examine how the databases are in any moment.
* Several of the CouchDB REST methods. Right now it has:
 - GET one document
 - GET `_all_docs`, including:
    - `include_docs=true`
    - `descending=true`
    - `startkey`
    - `endkey`
    - also, using `_all_docs` with POST to specify the desired keys
 - GET the information of a database
 - GET `_all_dbs`
 - PUT one document
 - PUT a database
 - POST one document
 - POST to `_bulk_docs` multiple documents
 - DELETE one document
 - DELETE a database

## Not yet implemented

* Right now, views (`_design` documents) are in very early stages.
* deleting by setting the `_deleted` member
* `_changes`
* And a lot of other things!

Keep in mind that Mock Couch is not attempting to fully implement CouchDB, but only the features necessary for unit testing CouchDB based apps.

However, if there is a feature you need for your tests, feel free to add a feature request in the [issues section](https://github.com/chris-l/mock-couch/issues)!

