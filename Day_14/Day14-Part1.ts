//dont forget to change index.ts
export default async function Day14() {
  const data = await Deno.readTextFile("Day_14/input.txt");
  // console.log(data);

  type block = {
    type: "sand" | "rock",
    cords: {x:number, y:number}
  }

  let blocks: block[] = [];

  const placeRocks = (x: number, y:number, x2: number, y2: number) => {
    if (x == x2) {
      if (y > y2) {
        for (let i = y2; i <= y; i++) {
          blocks.push(
            {
              type:"rock",
              cords: {x: x, y: i}
            })
        }
      }
      else {
        for (let i = y; i <= y2; i++) {
          blocks.push(
            {
              type:"rock",
              cords: {x: x, y: i}
            })
        }
      }
    }
    else if (y == y2) {
      if (x > x2) {
        for (let i = x2; i <= x; i++) {
          blocks.push(
            {
              type:"rock",
              cords: {x: i, y: y}
            })
        }
      }
      else {
        for (let i = x; i <= x2; i++) {
          blocks.push(
            {
              type:"rock",
              cords: {x: i, y: y}
            })
        }
      }
    }
    else {
      throw new Error(`bad pair: ${x}, ${y}, ${x2}, ${y2}`)
    }
  }
  let inp: string[][] = []
  data.split("\n").forEach((e, i) => {
    inp.push(e.split(" -> "))
  })
  inp.forEach((trace) => {
    for (let i = 0; i < trace.length - 1; i++) {
      let nums1 = trace[i].split(",").map(Number);
      let nums2 = trace[i+1].split(",").map(Number);
      placeRocks(nums1[0], nums1[1], nums2[0], nums2[1])
    }
  })
  blocks = blocks.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.cords.x === value.cords.x && t.cords.y === value.cords.y
  ))
  )
  // console.log(blocks)
  let abyss = false;
  let count = 0;
  while(!abyss) {
    let stop = false;
    let tempcords = {x:500, y:0};
    let abysscount = 0;
    while (!stop) {
      // console.log(tempcords)
      if (abysscount > 100) {
        stop = true;
        abyss = true;
      }
      let down = {x:tempcords.x, y:tempcords.y+1};
      let downright = {x:tempcords.x+1, y:tempcords.y+1};
      let downleft = {x:tempcords.x-1, y:tempcords.y+1};
      if (blocks.filter((v) => (v.cords.x == down.x && v.cords.y == down.y)).length == 0) {
        tempcords.x = down.x
        tempcords.y = down.y
        abysscount++;
      }
      else if (blocks.filter((v) => (v.cords.x == downleft.x && v.cords.y == downleft.y)).length == 0) {
        tempcords.x = downleft.x
        tempcords.y = downleft.y
      }
      else if (blocks.filter((v) => (v.cords.x == downright.x && v.cords.y == downright.y)).length == 0) {
        tempcords.x = downright.x
        tempcords.y = downright.y
      }
      else {
        stop = true;
      }
    }
    blocks.push({type:"sand", cords:tempcords})
    count++;
    // console.log(blocks)
  }
  console.log(count-1)
}