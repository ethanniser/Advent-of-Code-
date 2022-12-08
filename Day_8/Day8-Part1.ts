//dont forget to change index.ts
export default async function Day8() {
  const data = await Deno.readTextFile("Day_8/input.txt");
  
  let lines: number[][] = [];
  data.split("\n").forEach((e) => {
    lines.push([...e].map(Number))
  })
  //console.log(lines);
  
  const height = lines.length;
  const width = lines[0]?.length;
  console.log(height, width);
  
  let visable = (2*height) + (2 * (width-2));
  //console.log(visable);
  
  let isVisable = (y: number, x: number, value: number): boolean => {
    let blocked = {
      left: false,
      right: false,
      top: false,
      bottom: false
    }
    for (let i = 0; i < x; i++) {
      if (lines[y][i] >= value) {
        blocked.left = true
      }
    }
    for (let i = x+1; i < width; i++) {
      if (lines[y][i] >= value) {
        blocked.right = true
      }
    }
    for (let i = 0; i < y; i++) {
      if (lines[i][x] >= value) {
        blocked.top = true
      }
    }
    for (let i = y+1; i < height; i++) {
      if (lines[i][x] >= value) {
        blocked.bottom = true
      }
    }
    return !(blocked.left && 
             blocked.right && 
             blocked.top && 
             blocked.bottom);
  }
  
  for (let i = 1; i < height-1; i++) {
    for (let j = 1; j < width-1; j++) {
      let e = lines[i][j];
      //console.log(e);
      //console.log(isVisable(i,j,e));
      if (isVisable(i,j,e)) visable++;
    }
  }
  console.log(visable);
}