# geo-legacy

> Get the geo-coordinates of every package at every version an author has published.

This finds all of a author's modules that have versions with a published
`coordinates` in their `package.json`. These are written in by hand or, more
likely, automatically with [geopkg](https://github.com/watson/geopkg).

`geo-legacy` includes a command-line program and an API.

## CLI

[@wa7son](https://github.com/watson) likes publishing his geo-coords on his
modules, so let's see his:

```
$ geo-legacy watson

{ aircat: 
   [ [ 56.1460465, 10.202726 ],
     [ 52.2491754, -7.0604458 ],
     [ 56.1460465, 10.202726 ] ],
  'airplay-mdns-server': [ [ 55.6928897, 12.547805 ], [ 52.249263, -7.060262900000001 ] ],
  'airplay-photos': [ [ 52.249175, -7.0604457 ], [ 56.1460465, 10.202726 ] ],
  'airplay-protocol': 
   [ [ 55.6469254, 12.5508886 ],
     [ 55.68770929999999, 12.595685 ],
     [ 55.6808073, 12.5718989 ],
 ...
```

All coordinates are in `[ latitude, longitude ]` order.

## API Usage

```js
var legacy = require('geo-legacy')
```

### legacy(username, cb)

Fetches all of `username`'s packages (npm username) at every version and
filters out ones that have geo-coordinates specified.

When complete, calls `cb` with `function (err, coords)`, where `coords` is an
object whose keys are the package name, and value is a list of `[ lat, lon ]`
tuples.


## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install geo-legacy
```

## See Also

- [watson/geopkg](https://github.com/watson/geopkg/issues/7)
- [noffle/place-geo-marker](https://github.com/noffle/place-geo-marker)


## License

ISC
