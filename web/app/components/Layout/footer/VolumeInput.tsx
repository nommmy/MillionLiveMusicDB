type Props = {
  volume: number;
  onVolumeChange: (volume: number) => void;
};
const VolumeInput = ({ volume, onVolumeChange }: Props) => {
  return (
    <div className="volume-bar">
      <input
        aria-label="volume"
        name="volume"
        type="range"
        min={0}
        step={0.05}
        max={1}
        value={volume}
        className="input-range"
        onChange={(e) => {
          onVolumeChange(e.currentTarget.valueAsNumber);
        }}
      />
    </div>
  );
};

export default VolumeInput;
