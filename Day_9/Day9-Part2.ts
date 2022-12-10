//dont forget to change index.ts
export default async function Day9() {
  const data = await Deno.readTextFile("Day_9/input.txt");
  //console.log(data);
  let split = data.split("\n");

  type cords = {
    x: number,
    y: number
  }
  
  let snake: cords[] = []
  for (let i = 0; i < 10; i++) {
    snake.push({x:0, y:0})
  }

  const printSnake = (snake: cords[]) => {
    snake.forEach((e, i) => console.log(i, e))
  }
  
  enum adjacent {
    ON = "ON",
    NEXT = "NEXT",
    U = "UP",
    UR = "UPRIGHT",
    UL = "UPLEFT",
    R = "RIGHT",
    L = "LEFT",
    D = "DOWN",
    DL = "DOWNLEFT",
    DR = "DOWNRIGHT"
  }

  const findTailAdj = (head: cords, tail: cords): adjacent => {
    let xdiff = head.x - tail.x;
    let ydiff = head.y - tail.y;
    // console.log("\n")
    // console.log("DIFFS", xdiff, ydiff)
    if (xdiff == 0 && ydiff == 0) return adjacent.ON;
    if (xdiff == -2 && ydiff == 0) return adjacent.L;
    if (xdiff == 2 && ydiff == 0) return adjacent.R;
    if (xdiff == 0 && ydiff == -2) return adjacent.D;
    if (xdiff == 0 && ydiff == 2) return adjacent.U;
    if ((xdiff == -2 && ydiff == -1) || 
        (xdiff == -1 && ydiff == -2) ||
        (xdiff == -2 && ydiff == -2)
       ) {
      return adjacent.DL;
    }
    if ((xdiff == 2 && ydiff == -1) || 
        (xdiff == 1 && ydiff == -2) ||
        (xdiff == 2 && ydiff == -2)
       ) {
      return adjacent.DR;
    }
    if ((xdiff == -2 && ydiff == 1) || 
        (xdiff == -1 && ydiff == 2) ||
        (xdiff == -2 && ydiff == 2)
       ) {
      return adjacent.UL;
    }
    if ((xdiff == 2 && ydiff == 1) || 
        (xdiff == 1 && ydiff == 2) ||
        (xdiff == 2 && ydiff == 2)
       ) {
    return adjacent.UR;
    }
    return adjacent.NEXT;
  }
  
  // printSnake(snake);
  let set = new Set<string>();
  set.add(`${snake[9].x}_${snake[9].y}`)
  
  split.forEach((e) => {
    let k = e.split(" ");
    let direction = k[0];
    let distance = Number(k[1]);
    // console.log(direction, distance)

    for (let i = 0; i < distance; i++) {
      // console.log("\n")
      // console.log("\n")
      // console.log("STEP", i+1, "OF", distance)
      for (let j = 0; j < 9; j++) {
        //if (direction == "U" && i == 2) throw new Error("STOP");
        let head = snake[j];
        let tail = snake[j+1]
        // console.log(head, tail);
        if (j == 0) {
          if (direction == "R") head.x += 1;
          if (direction == "L") head.x -= 1;
          if (direction == "U") head.y += 1;
          if (direction == "D") head.y -= 1;
        }
        // console.log(head, tail);
        let tailAdj = findTailAdj(head, tail);
        // console.log("\n")
        // console.log("NODE", j+1, tailAdj)
        
        if (tailAdj == adjacent.R) {
          tail.x += 1;
        }
        if (tailAdj == adjacent.L) {
          tail.x -= 1;
        }
        if (tailAdj == adjacent.U) {
          tail.y += 1;
        }
        if (tailAdj == adjacent.D) {
          tail.y -= 1;
        }
        if (tailAdj == adjacent.UR) {
          tail.x += 1; 
          tail.y += 1;
        }
        if (tailAdj == adjacent.UL) {
          tail.x -= 1; 
          tail.y += 1;
        }
        if (tailAdj == adjacent.DR) {
          tail.x += 1; 
          tail.y -= 1;
        }
        if (tailAdj == adjacent.DL) {
          tail.x -= 1; 
          tail.y -= 1;
        }
      set.add(`${snake[9].x}_${snake[9].y}`)
      // printSnake(snake);
      }
      //printSnake(snake);
    }
  })
  // console.log("\n")
  // console.log("\n")
  // console.log("FINAL")
  console.log(Array.from(set.values()).length);
}