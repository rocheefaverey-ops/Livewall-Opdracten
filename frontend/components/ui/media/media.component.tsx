import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { MediaType } from 'types/media';
import classes from './media.module.css';

type Props = {
  media: MediaType;
  description?: string;
  fit?: 'scale' | 'crop' | 'clip' | 'clamp' | 'fill';
  contain?: boolean;
  header?: boolean;
  card?: boolean;
  className?: string;
  classMedia?: string;
  externalVideo?: boolean;
  priority?: boolean;
  structured?: boolean;
  alt?: string;
  portrait?: boolean;
  productPortrait?: boolean;
  mcover?: boolean;
  title?: string;
  noAspectRatio?: boolean;
};

const Media: React.FC<Props> = ({
  media,
  description,
  header,
  externalVideo,
  contain = false,
  fit = 'fill',
  className = '',
  classMedia = '',
  priority,
  structured = false,
  alt,
  card,
  portrait = false,
  productPortrait = false,
  mcover = false,
  title,
  noAspectRatio = false
}) => {
  const [ready, setReady] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const [toggler, setToggler] = useState(false);

  const getContainerDimensions = (elem: HTMLElement | null) => {
    const width = elem?.clientWidth;
    const height = elem?.clientHeight;

    if (width && height) return { width, height };
    return null;
  };

  const objectFit = contain ? 'contain' : 'cover';

  const getMediaBody = () => {
    const dimensions = getContainerDimensions(imageContainerRef.current);
    if (!dimensions) return null;

    switch (true) {
      case externalVideo:
        return (
          <iframe
            className="w-full h-full"
            src={`${media?.url}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        );
      case !externalVideo && media.format === 'mp4':
        return <video muted controls width={dimensions.width} height={dimensions.height} src={media?.url ?? ''} />;
      default:
        // eslint-disable-next-line no-case-declarations
        let url = `${media?.url}?fm=webp&fit=${portrait || header || card ? 'crop' : fit}&w=${dimensions?.width}&h=${dimensions?.height}&auto=compress`;

        if (media?.focalPoint?.x && media?.focalPoint?.y) url = `${url}&fp-x=${media.focalPoint?.x}&fp-y=${media.focalPoint?.y}`;

        return (
          <Image
            fill
            priority={priority}
            quality={100}
            blurDataURL={media.blurUpThumb}
            placeholder={media.blurUpThumb ? 'blur' : 'empty'}
            className={title ? 'opacity-80' : ''}
            src={url}
            alt={media.alt ?? media.title ?? alt ?? media.id}
            onClick={() => setToggler(!toggler)}
            style={{ objectPosition: 'left', objectFit: portrait ? 'contain' : objectFit }}
          />
        );
    }
  };

  useEffect(() => {
    if (imageContainerRef.current) {
      setReady(true);
    }
  }, []);

  const portraitClass = classNames({
    'max-w-[323px] max-h-[574.22px] aspect-[9/16]': portrait,
    'max-w-[275px] max-h-full aspect-[9/16]': productPortrait,
    'min-w-full': card,
    'min-w-full h-[468px]': mcover,
    'h-[240px] lg:h-[480px] min-w-full': header,
    'bg-greyDark01 bg-blend-overlay': title
  });

  return (
    <div className={`${portraitClass} ${classes.mediaContainer} ${className} ${structured ? 'my-3 md:my-6' : ''}`} ref={imageContainerRef}>
      <div
        className={classNames(
          portraitClass,
          classMedia,
          {
            'aspect-video': !(portrait || header || productPortrait) && !noAspectRatio,
            [classes.richtextVideoContainer]: externalVideo
          },
          'btn relative'
        )}
      >
        {ready && getMediaBody()}
      </div>
      {description && <div className={classes.mediaCaption}>{description}</div>}
    </div>
  );
};

export default Media;
