import {useEffect, useState} from 'react';

export const useImage = (src: string): HTMLImageElement | undefined => {
  const [image, setImage] = useState<HTMLImageElement | undefined>();

  useEffect(() => {
    const onLoad = () => setImage(image);

    const image = new Image();
    image.src = src;
    image.addEventListener('load', onLoad);

    return () => {
      image.removeEventListener('load', onLoad);
      setImage(undefined);
    };
  }, [src]);

  return image;
};
