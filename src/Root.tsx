import { Composition } from "remotion";
import { MangaPage } from "./MangaPage";
import { addAll } from "./utils";
import { SOURCE, SOURCE2 } from "./source";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Chapter-02"
        component={MangaPage}
        defaultProps={{
          SOURCE
        }}
        durationInFrames={addAll(SOURCE.map(i => i.duration))}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="Chapter-03"
        component={MangaPage}
        defaultProps={{
          SOURCE: SOURCE2
        }}
        durationInFrames={addAll(SOURCE2.map(i => i.duration))}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
