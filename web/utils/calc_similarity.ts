import { TrackType } from "@/app/components/track/TrackSimilar";

export const normalizeTempo = (
  otherTracks: TrackType[],
  currentTrackTempo: number
): [TrackType[], number] => {
  const otherTrackTempos = otherTracks.map((item) => item.tempo);
  const minTempo = Math.min(...otherTrackTempos, currentTrackTempo);
  const maxTempo = Math.max(...otherTrackTempos, currentTrackTempo);

  const normalizedOtherTracks = otherTracks.map((item) => ({
    ...item,
    tempo: (item.tempo - minTempo) / (maxTempo - minTempo),
  }));

  const normalizedCurrentTempo =
    (currentTrackTempo - minTempo) / (maxTempo - minTempo);

  return [normalizedOtherTracks, normalizedCurrentTempo];
};

export const sortSimilarityTop100 = (
  data: TrackType[],
  targetTrack: number[]
) => {
  // ユークリッド距離を計算して各行との関連度を算出
  // ＊相関係数を使う場合はcalculateCorrelation()を使用（引数はそのまま）
  const correlations = data.map((track, index) => ({
    index,
    correlation: euclideanDistance(targetTrack, [
      track.acousticness,
      track.danceability,
      track.energy,
      track.valence,
      track.tempo,
    ]),
  }));

  // ＊相関係数を使う場合は降順、b.correlation - a.correlation
  correlations.sort((a, b) => a.correlation - b.correlation);
  const sortedData = Array.from(correlations, ({ index }) => data[index]);

  return sortedData.slice(0, 100);
};

// ユークリッド距離を計算する関数
function euclideanDistance(data1: number[], data2: number[]) {
  return Math.sqrt(
    data1.reduce((sum, value, index) => sum + (value - data2[index]) ** 2, 0)
  );
}

// 相関係数を計算する関数
const calculateCorrelation = (a: number[], b: number[]) => {
  const meanA = a.reduce((sum, value) => sum + value, 0) / a.length;
  const meanB = b.reduce((sum, value) => sum + value, 0) / b.length;

  const numerator =
    a.reduce((sum, value, i) => sum + (value - meanA) * (b[i] - meanB), 0) /
    a.length;
  const denominatorA = Math.sqrt(
    a.reduce((sum, value) => sum + Math.pow(value - meanA, 2), 0) / a.length
  );
  const denominatorB = Math.sqrt(
    b.reduce((sum, value) => sum + Math.pow(value - meanB, 2), 0) / a.length
  );

  return numerator / (denominatorA * denominatorB);
};
