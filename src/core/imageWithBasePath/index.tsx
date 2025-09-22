import React, { useState } from 'react';
import { img_path } from '../../environment';

interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
  style?: React.CSSProperties;
}

const normalizeSrc = (base: string, src: string) => {
  const needsSlash = !base.endsWith('/') && !src.startsWith('/');
  return `${base}${needsSlash ? '/' : ''}${src}`;
};

const DEFAULT_FALLBACK = 'assets/img/profiles/avatar_1.jpg';

const ImageWithBasePath = (props: ImageProps) => {
  const initialSrc = normalizeSrc(img_path, props.src);
  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);
  const [didFallback, setDidFallback] = useState<boolean>(false);

  const handleError: React.ReactEventHandler<HTMLImageElement> = () => {
    if (!didFallback) {
      setDidFallback(true);
      setCurrentSrc(normalizeSrc(img_path, DEFAULT_FALLBACK));
    }
  };

  return (
    <img
      className={props.className}
      src={currentSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
      style={props.style}
      onError={handleError}
    />
  );
};

export default ImageWithBasePath;
