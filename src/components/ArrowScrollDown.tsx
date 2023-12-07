/* width="4.0621rem" height="4.375rem" */

function ArrowScrollDown({
  width = '1.7409rem',
  height = '1.875rem',
  color = 'black',
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5645 1.6437C21.1192 1.64405 21.651 1.86455 22.0433 2.25677C22.4355 2.64899 22.656 3.18086 22.6563 3.73555V20.5098C22.656 21.0645 22.4355 21.5964 22.0433 21.9886C21.651 22.3808 21.1192 22.6013 20.5645 22.6017L3.79023 22.6017C3.24819 22.5822 2.73478 22.3534 2.35793 21.9633C1.98109 21.5732 1.77014 21.0522 1.76942 20.5098C1.77014 19.9674 1.98109 19.4464 2.35793 19.0563C2.73479 18.6662 3.24818 18.4374 3.79023 18.418L15.5125 18.418L0.830067 3.73555C0.437526 3.34301 0.216999 2.81061 0.216999 2.25547C0.216999 1.70033 0.437525 1.16793 0.830067 0.775387C1.22261 0.382845 1.75501 0.162318 2.31015 0.162318C2.86529 0.162318 3.39769 0.382845 3.79023 0.775386L18.4726 15.4578L18.4726 3.73555C18.473 3.18086 18.6935 2.64899 19.0857 2.25677C19.4779 1.86455 20.0098 1.64405 20.5645 1.6437Z"
        fill={color}
      />
    </svg>
  );
}

export default ArrowScrollDown;