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
  //console.log(height, width);
  
  let visable = (2*height) + (2 * (width-2));
  //console.log(visable);
  
  let calcScenic = (y: number, x: number, value: number): number => {
    let view = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
    for (let i = x+1; i < width; i++) {
      view.right += 1;
      if (lines[y][i] >= value) {
        break;
      }
    }
    for (let i = x-1; i >= 0; i--) {
      view.left += 1;
      if (lines[y][i] >= value) {
        break;
      }
    }
    for (let i = y+1; i < height; i++) {
      view.bottom += 1;
      if (lines[i][x] >= value) {
        break;
      }
    }
    for (let i = y-1; i >= 0; i--) {
      view.top += 1;
      if (lines[i][x] >= value) {
        break;
      }
    }
    //console.log(view)
    return (view.left * view.right * view.top * view.bottom);
  }

  let max = 0;
  for (let i = 1; i < height-1; i++) {
    for (let j = 1; j < width-1; j++) {
      let e = lines[i][j];
      let scenic = calcScenic(i,j,e);
      //console.log(e, scenic, max);
      max = Math.max(max, scenic);
    }
  }
  console.log(max);
}