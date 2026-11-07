import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';

function ZoomableImage(props) {
  return (
    <a href={props.src} target="_blank" rel="noopener" className="zoomable-image">
      <img {...props} loading="lazy" />
    </a>
  );
}

export default {
  ...MDXComponents,
  img: ZoomableImage,
};
