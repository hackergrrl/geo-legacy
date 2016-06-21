var request = require('request')
var ls = require('npm-list-author-packages')
var from = require('from2')
var through = require('through2')
var concat = require('concat-stream')
var parallel = require('parallel-transform')

ls({'username':process.argv[2]}, function (err, list) {
  if (err) throw err

  var coords = {}

  from.obj(list)
    .pipe(parallel(15, function (pkg, next) {
      var self = this
      request('http://registry.npmjs.org/' + pkg)
        .pipe(concat(function (str) {
          var json = JSON.parse(str).versions
          var coords = {
            pkg: pkg,
            coords: Object.keys(json)
              .map(function (version) {
                var coords = json[version].coordinates
                return coords ? coords : null
              })
              .filter(function (item) { return item !== null })
          }
          self.push(coords)
          next()
        }))
    }))
  .pipe(through.obj(function (obj, enc, next) {
    console.error('got', obj.pkg)
    if (obj.coords.length > 0) {
      coords[obj.pkg] = obj.coords
    }
    next()
  }, function end () {
    console.log(coords)
  }))
})
