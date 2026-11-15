import type { LayoutPolicy } from "quinecms/core/layout-contract";
const policy: LayoutPolicy = {
  title: (settings) => String(settings.title || "Enode"),
  globals: () => ({
    contentMaxWidth: 1600,
    pageGutter: 0,
    theme: "light",
    bodyFontSize: 16,
    bodyLineHeight: 1.5,
  }),
};
export default policy;
