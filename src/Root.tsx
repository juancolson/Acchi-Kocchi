import { Composition } from "remotion";
import { MangaPage } from "./MangaPage";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MangaPage}
        durationInFrames={450}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
