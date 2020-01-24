

A very fast static spatial index for 2D points based on a flat KD-tree.

- points only — no rectangles
- static — you can't add/remove items
- indexing is 5-8 times faster

```js
const points= [55,20,20,10,10,90,90,56,56,58,5,4]
const index = new KDBushOneDimension(points, undefined, undefined,10,Float64Array, true);         // make an index
const ids1 = index.range(10, 10, 20, 20); // bbox search - minX, minY, maxX, maxY
const ids2 = index.within(10, 10, 5);     // radius search - x, y, radius
```

## Install

Install using NPM (`npm install kdbush-onedimension`) or Yarn (`yarn add kdbush-onedimension`), then:

```js
// import as a ES module
import KDBushOneDimension from 'kdbush-onedimension';

// or require in Node / Browserify
const KDBushOneDimension = require('kdbush-onedimension');
```

## API

#### new KDBush(points[, getX, getY, nodeSize, arrayType, justUseOneDimensionalPointArrayPlease])

Creates an index from the given points.

- `points`: Input array of points.
- `getX`, `getY`: Functions to get `x` and `y` from an input point. By default, it assumes `[x, y]` format.
- `nodeSize`: Size of the KD-tree node, `64` by default. Higher means faster indexing but slower search, and vise versa.
- `arrayType`: Array type to use for storing coordinate values. `Float64Array` by default, but if your coordinates are integer values, `Int32Array` makes things a bit faster.
- `justUseOneDimensionalPointArrayPlease`: **if your point array is one dimensional point array set this option `true` with this option you can not use `getX, getY` callbacks**

```js
const index = new KDBushOneDimension(points, p => p.x, p => p.y, 64, Int32Array);
```

#### index.range(minX, minY, maxX, maxY)

Finds all items within the given bounding box and returns an array of indices that refer to the items in the original `points` input array.

```js
const results = index.range(10, 10, 20, 20).map(id => points[id]);
```

#### index.within(x, y, radius)

Finds all items within a given radius from the query point and returns an array of indices.

```js
const results = index.within(10, 10, 5).map(id => points[id]);
```

#### bench test:

```
###TwoDimension
memory: 85798.464 KB
index 1000000 points: 190.468ms
memory: 85866.384 KB
10000 small bbox queries: 17.985ms
10000 small radius queries: 19.774ms
###OneDimension
memory: 104452.88 KB  increase because of first function
index 1000000 points: 101.040ms
memory: 118575.48 KB
10000 small bbox queries: 17.311ms
10000 small radius queries: 16.729ms
```
