import { FC } from 'react';

import { IVideo } from '../../interfaces';

interface ITrailerProps {
  video: IVideo;
}

export const Trailer: FC<ITrailerProps> = ({ video }) => {
  const { key, type } = video;

  return (
    <div style={{ textAlign: 'center' }}>
      {type === 'Trailer' && (
        <iframe
          width={800}
          height={450}
          src={`https://www.youtube.com/embed/${key}`}
          frameBorder={'none'}
          title="video"
        ></iframe>
      )}
    </div>
  );
};
