import { useCurrentFrame, useVideoConfig } from "remotion";

export const MyComposition = () => {
  const { fps, durationInFrames, width, height} = useVideoConfig()
  const frame = useCurrentFrame()
  const opacity = frame / durationInFrames
  return (
    <div style={{
      color: 'white',
      fontSize: '7em',
      background: 'black',
      flex: 1,
      textAlign: 'center',
  
    }}>
    </div>
  )
};
