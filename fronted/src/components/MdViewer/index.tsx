import { useEffect, useRef } from "react";
import * as bytemd from "bytemd";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "github-markdown-css/github-markdown-light.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";

interface Props {
  value?: string;
}

const plugins = [gfm(), highlight()];

const MdViewer = (props: Props) => {
  const { value = "" } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !viewerRef.current) {
      // 使用 bytemd 的 Viewer Svelte 组件
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ViewerClass = (bytemd as any).Viewer;
      viewerRef.current = new ViewerClass({
        target: containerRef.current,
        props: {
          value,
          plugins,
        },
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.$destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.$set({ value });
    }
  }, [value]);

  return <div className="md-viewer" ref={containerRef} />;
};

export default MdViewer;
