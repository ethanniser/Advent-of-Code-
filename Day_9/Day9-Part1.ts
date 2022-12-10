//dont forget to change index.ts
export default async function Day9() {
  const data = await Deno.readTextFile("Day_9/input.txt");
  //console.log(data);
  let split = data.split("\n");
  
  let headPos = {x: 0, y: 0}
  let tailPos = {x: 0, y: 0}
  
  enum adjacent {
    ON = "ON",
    U = "UP",
    UR = "UPRIGHT",
    UL = "UPLEFT",
    R = "RIGHT",
    L = "LEFT",
    D = "DOWN",
    DL = "DOWNLEFT",
    DR = "DOWNRIGHT"
  }

  const findTailAdj = (): adjacent => {
    let xdiff = headPos.x - tailPos.x;
    let ydiff = headPos.y - tailPos.y;
    //console.log("DIFFS", xdiff, ydiff)
    if (xdiff == 0 && ydiff == 0) return adjacent.ON;
    else if (xdiff == 1 && ydiff == 0) return adjacent.L;
    else if (xdiff == -1 && ydiff == 0) return adjacent.R;
    else if (xdiff == 0 && ydiff == 1) return adjacent.D;
    else if (xdiff == 0 && ydiff == -1) return adjacent.U;
    else if (xdiff == 1 && ydiff == 1) return adjacent.DL;
    else if (xdiff == -1 && ydiff == -1) return adjacent.UR;
    else if (xdiff == 1 && ydiff == -1) return adjacent.UL;
    else if (xdiff == -1 && ydiff == 1) return adjacent.DR;
    throw "LOL";
    return adjacent.ON;
  }
  //console.log(headPos, tailPos);
  let set = new Set<string>();
  set.add(`${tailPos.x}_${tailPos.y}`)
  
  split.forEach((e) => {
    let k = e.split(" ");
    let direction = k[0];
    let distance = Number(k[1]);
    //console.log(direction, distance)

    for (let i = 0; i < distance; i++) {
      let tailAdj = findTailAdj();
      //console.log(tailAdj)
      if (direction == "R") headPos.x += 1;
      else if (direction == "L") headPos.x -= 1;
      else if (direction == "U") headPos.y += 1;
      else if (direction == "D") headPos.y -= 1;
      
      if (tailAdj == adjacent.L && direction == "R") tailPos.x += 1;
      else if (tailAdj == adjacent.R && direction == "L") tailPos.x -= 1;
      else if (tailAdj == adjacent.D && direction == "U") tailPos.y += 1;
      else if (tailAdj == adjacent.U && direction == "D") tailPos.y -= 1;
      else if (tailAdj == adjacent.UR) {
        if (direction == "L" || direction == "D") {
          tailPos.x -= 1; tailPos.y -= 1; 
        }
      }
      else if (tailAdj == adjacent.UL) {
        if (direction == "R" || direction == "D") {
          tailPos.x += 1; tailPos.y -= 1; 
        }
      }
      else if (tailAdj == adjacent.DR) {
        if (direction == "L" || direction == "U") {
          tailPos.x -= 1; tailPos.y += 1; 
        }
      }
      else if (tailAdj == adjacent.DL) {
        if (direction == "R" || direction == "U") {
          tailPos.x += 1; tailPos.y += 1; 
        }
      }
      //console.log(headPos, tailPos);
      set.add(`${tailPos.x}_${tailPos.y}`)
    }
  })
  console.log(Array.from(set.values()).length);
}