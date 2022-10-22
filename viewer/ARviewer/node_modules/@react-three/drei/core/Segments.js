import _extends from '@babel/runtime/helpers/esm/extends';
import * as THREE from 'three';
import * as React from 'react';
import mergeRefs from 'react-merge-refs';
import { useFrame, extend } from '@react-three/fiber';
import { Line2, LineMaterial, LineSegmentsGeometry } from 'three-stdlib';

const context = /*#__PURE__*/React.createContext(null);

const arrColor = color => color instanceof THREE.Color ? color.toArray() : color;

const arrPos = pos => pos instanceof THREE.Vector3 ? pos.toArray() : pos;

const Segments = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  const {
    limit = 1000,
    lineWidth = 1.0,
    children,
    ...rest
  } = props;
  const [segments, setSegments] = React.useState([]);
  const [line] = React.useState(() => new Line2());
  const [material] = React.useState(() => new LineMaterial());
  const [geometry] = React.useState(() => new LineSegmentsGeometry());
  const [resolution] = React.useState(() => new THREE.Vector2(512, 512));
  const [positions] = React.useState(() => Array(limit * 6).fill(0));
  const [colors] = React.useState(() => Array(limit * 6).fill(0));
  const api = React.useMemo(() => ({
    subscribe: ref => {
      setSegments(segments => [...segments, ref]);
      return () => setSegments(segments => segments.filter(item => item.current !== ref.current));
    }
  }), []);
  useFrame(() => {
    for (let i = 0; i < limit; i++) {
      var _segments$i;

      const segment = (_segments$i = segments[i]) == null ? void 0 : _segments$i.current;
      const segmentStart = segment ? arrPos(segment.start) : [0, 0, 0];
      const segmentEnd = segment ? arrPos(segment.end) : [0, 0, 0];
      const segmentColor = segment ? arrColor(segment.color) : [1, 1, 1]; //console.log(segmentStart, segmentEnd, segmentColor)

      for (var j = 0; j < 3; j++) {
        positions[i * 6 + j] = segmentStart[j];
        positions[i * 6 + j + 3] = segmentEnd[j];
        colors[i * 6 + j] = segmentColor[j];
        colors[i * 6 + j + 3] = segmentColor[j];
      }
    }

    geometry.setColors(colors);
    geometry.setPositions(positions);
    line.computeLineDistances();
  });
  return /*#__PURE__*/React.createElement("primitive", {
    object: line,
    ref: forwardedRef
  }, /*#__PURE__*/React.createElement("primitive", {
    object: geometry,
    attach: "geometry"
  }), /*#__PURE__*/React.createElement("primitive", _extends({
    object: material,
    attach: "material",
    vertexColors: true,
    resolution: resolution,
    linewidth: lineWidth
  }, rest)), /*#__PURE__*/React.createElement(context.Provider, {
    value: api
  }, children));
});

class SegmentObject {
  constructor() {
    this.color = new THREE.Color('white');
    this.start = new THREE.Vector3(0, 0, 0);
    this.end = new THREE.Vector3(0, 0, 0);
  }

}

const Segment = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  const api = React.useContext(context);
  if (!api) throw 'Segment must used inside Segments component.';
  const ref = React.useRef();
  React.useMemo(() => extend({
    SegmentObject
  }), []);
  React.useLayoutEffect(() => api.subscribe(ref), []);
  return /*#__PURE__*/React.createElement("segmentObject", _extends({
    ref: mergeRefs([ref, forwardedRef])
  }, props));
});

export { Segment, Segments };
