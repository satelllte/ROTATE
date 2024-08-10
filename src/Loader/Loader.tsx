import {ASSETS} from '../constants';

export function Loader() {
  return <img src={ASSETS.img.loader} style={style} />;
}

const style = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  margin: '-24px 0 0 -24px',
  zIndex: 100,
} satisfies React.CSSProperties;
