export type AudioName = string;

export interface IAudio {
  file: StoregedAudio;
  name: AudioName;
  auidoId: UniqueId;
}

// TODO: audiometadata
// export type AudioMetadata = {}