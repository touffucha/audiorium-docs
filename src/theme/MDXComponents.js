import React, { useEffect, useRef, useState } from 'react';
import MDXComponents from '@theme-original/MDXComponents';

const CaptureScale = 1.5;

// 画像の題に "full" を付けると、撮影の倍率で縮めず本文の幅いっぱいに出す（できることの 2 つの画面）
function ZoomableImage({ title, ...props }) {
  const full = title === 'full';
  const ref = useRef(null);
  const [width, setWidth] = useState(undefined);
  const measure = () => {
    const image = ref.current;
    if (!image || !image.naturalWidth) return;
    setWidth(Math.round(image.naturalWidth / CaptureScale));
  };
  useEffect(() => {
    if (!full && ref.current?.complete) measure();
  }, [props.src]);
  return (
    <a href={props.src} target="_blank" rel="noopener" className={full ? 'zoomable-image zoomable-image--full plate' : 'zoomable-image plate'}>
      <img {...props} title={full ? undefined : title} ref={ref} loading="lazy" onLoad={full ? undefined : measure} style={!full && width ? { width } : undefined} />
    </a>
  );
}

export default {
  ...MDXComponents,
  img: ZoomableImage,
};
