import { Composition } from "remotion";
import { MangaPage } from "./MangaPage";
import { addAll } from "./utils";
import { SOURCE } from "./source";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MangaPage}
        durationInFrames={addAll(SOURCE.map(i => i.duration))}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
