import React, { useEffect, useRef, useState } from 'react';
import MDXComponents from '@theme-original/MDXComponents';

const CaptureScale = 1.5;

function ZoomableImage(props) {
  const ref = useRef(null);
  const [width, setWidth] = useState(undefined);
  const measure = () => {
    const image = ref.current;
    if (!image || !image.naturalWidth) return;
    setWidth(Math.round(image.naturalWidth / CaptureScale));
  };
  useEffect(() => {
    if (ref.current?.complete) measure();
  }, [props.src]);
  return (
    <a href={props.src} target="_blank" rel="noopener" className="zoomable-image plate">
      <img {...props} ref={ref} loading="lazy" onLoad={measure} style={width ? { width } : undefined} />
    </a>
  );
}

export default {
  ...MDXComponents,
  img: ZoomableImage,
};
