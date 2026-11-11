import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MDXComponents from '@theme-original/MDXComponents';

const CaptureScale = 1.5;

const pageScaleWidth = (image) => Math.round(image.naturalWidth / CaptureScale);

function Lightbox({ src, alt, width, onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <img src={src} alt={alt} style={{ width }} />
    </div>,
    document.body,
  );
}

// 画像の題に "full" を付けると、撮影の倍率で縮めず本文の幅いっぱいに出す（できることの 2 つの画面）
function ZoomableImage({ title, ...props }) {
  const full = title === 'full';
  const ref = useRef(null);
  const [width, setWidth] = useState(undefined);
  const [zoomedWidth, setZoomedWidth] = useState(0);
  const measure = () => {
    const image = ref.current;
    if (!image || !image.naturalWidth) return;
    setWidth(pageScaleWidth(image));
  };
  useEffect(() => {
    if (!full && ref.current?.complete) measure();
  }, [props.src]);
  const zoom = (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    if (ref.current.naturalWidth) setZoomedWidth(ref.current.naturalWidth);
  };
  return (
    <>
      <a href={props.src} onClick={zoom} className={full ? 'zoomable-image zoomable-image--full plate' : 'zoomable-image plate'}>
        <img {...props} title={full ? undefined : title} ref={ref} loading="lazy" onLoad={full ? undefined : measure} style={!full && width ? { width } : undefined} />
      </a>
      {zoomedWidth > 0 && <Lightbox src={props.src} alt={props.alt} width={zoomedWidth} onClose={() => setZoomedWidth(0)} />}
    </>
  );
}

export default {
  ...MDXComponents,
  img: ZoomableImage,
};
