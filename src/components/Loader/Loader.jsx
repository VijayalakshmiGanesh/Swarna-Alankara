import { RotatingTriangles } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <RotatingTriangles
        visible={true}
        height="150"
        width="150"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
        colors={['#172554', '#be185d', '#172554']}
      />
    </div>
  );
}

export default Loader;
