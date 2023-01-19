import { ColorRing } from 'react-loader-spinner';

export function Loader({ size }) {
  return (
    <>
      <ColorRing
        visible={true}
        height={size}
        width={size}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        colors={['#97999B', '#97999B', '#97999B', '#97999B', '#97999B']}
      />
    </>
  );
}
