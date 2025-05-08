export default function Slider({ ...props }) {
  return (
    <div className="relative w-full pb-2">
      <input
        type="range"
        {...props}
        className={`
        w-full h-2 rounded-lg cursor-pointer appearance-none
        bg-indigo-400
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-white
        [&::-webkit-slider-thumb]:shadow-md
        [&::-webkit-slider-thumb]:border
        [&::-webkit-slider-thumb]:border-indigo-600

        [&::-moz-range-thumb]:appearance-none
        [&::-moz-range-thumb]:w-4
        [&::-moz-range-thumb]:h-4
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:bg-white
        [&::-moz-range-thumb]:shadow-md
        [&::-moz-range-thumb]:border
        [&::-moz-range-thumb]:border-indigo-600
      `}
      />
    </div>
  );
}
