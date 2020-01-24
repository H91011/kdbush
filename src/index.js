
import sort from './sort';
import range from './range';
import within from './within';

const defaultGetX = p => p[0];
const defaultGetY = p => p[1];

export default class KDBushOneDimension {
    constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array, justUseOneDimensionalPointArrayPlease) {
        this.nodeSize = nodeSize;
        this.points = points;

        const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;

        let ids;
        let coords;

        if (justUseOneDimensionalPointArrayPlease) {
            const idArr = [];
            for (let i = 0; i < points.length / 2; i++) {
                idArr[i] = i;
            }
            this.ids =   ids = new IndexArrayType(idArr);
            coords =   this.coords = new ArrayType(points);
        } else {
            ids = this.ids = new IndexArrayType(points.length);
            coords = this.coords = new ArrayType(points.length * 2);

            for (let i = 0; i < points.length; i++) {
                ids[i] = i;
                coords[2 * i] = getX(points[i]);
                coords[2 * i + 1] = getY(points[i]);
            }
        }
        // store indices to the input array and coordinates in separate typed arrays


        // kd-sort both arrays for efficient search (see comments in sort.js)
        sort(ids, coords, nodeSize, 0, ids.length - 1, 0);
    }

    range(minX, minY, maxX, maxY) {
        return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    }

    within(x, y, r) {
        return within(this.ids, this.coords, x, y, r, this.nodeSize);
    }
}
