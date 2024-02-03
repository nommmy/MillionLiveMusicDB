interface ProgressCSSProps extends React.CSSProperties {
  "--progress-width": number;
  "--buffered-width": number;
}
interface AudioProgressBarProps
  extends React.ComponentPropsWithoutRef<"input"> {
  duration: number;
  currentProgress: number;
  buffered: number;
}

const AudioProgressBar = ({
  duration,
  currentProgress,
  buffered,
  ...rest
}: AudioProgressBarProps) => {
  //実際の進行状況とバッファリング（再生されてるとこよりちょっと先のダウンロードされてる部分）された部分を取得してstyleを適用
  const progressBarWidth = isNaN(currentProgress / duration)
    ? 0
    : currentProgress / duration;
  const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;
  // 変数を変えて渡すことで、styleを変更
  const progressStyles: ProgressCSSProps = {
    "--progress-width": progressBarWidth,
    "--buffered-width": bufferedWidth,
  };

  return (
    <div className="progress-bar-container">
      <input
        type="range"
        name="progress"
        style={progressStyles}
        min={0}
        max={duration}
        value={currentProgress}
        className="input-range progress-bar"
        {...rest}
      />
    </div>
  );
};

export default AudioProgressBar;