const extColor = {
    pdf: "purple",
    xls: "orange",
    doc: "blue",
    txt: "blue",
    png: "green",
    jpg: "green",
    jpeg: "green",
    zip: "red",
  } as const;
  
  export type Extension = keyof typeof extColor;
  export type Color = typeof extColor[Extension];
  
  export const getColByExt = (ext: string): Color => {
    return extColor[ext];
  };
  