//dont forget to change index.ts
export default async function Day12() {
  const data = await Deno.readTextFile("Day_12/input.txt");
  //console.log(data);
  const grid: number[][] = []
  const split = data.split("\n")
  split.forEach((e) => {
    grid.push(e.split("").map((x) => x.charCodeAt(0) - 96))
  });
  //console.log(grid)
  // S == -14, E == -28
  // let start = {x:0,y:0};
  let end = {x:0,y:0};
  grid.forEach((line, row) => {
    line.forEach((item, col) => {
      if (item == -13) {
        // start = {x:col,y:row}
        grid[row][col] = 1;
      }
      if (item == -27) {
        end = {x:col,y:row}
        grid[row][col] = 26;
      }
    })
  })
  //console.log(grid)
  //console.log(start, end)

  const parse_path = (y:number, x: number) => {
  	let count = 0;
  	while (y != end.y || x != end.x) {
  		count++;
  		const tempY = before[y][x][0];
  		const tempX = before[y][x][1];
  
  		x = tempX;
  		y = tempY;
  	}

    console.log(count)
  }

  
  const neighborX = [0, 0, 1, -1];
  const neighborY = [1, -1, 0, 0];
  const height = grid.length;
  const width = grid[0].length
  const isValid = (y:number, x:number, y2: number, x2: number) => {
    if (y < 0) return false;
    if (x < 0) return false;
    if (y >= height) return false;
    if (x >= width) return false;
    if (grid[y2][x2] > grid[y][x]+1) return false;
    return true;
  }

  function makeArray<T>(w:number, h:number, val:T) {
    const arr:T[][] = [];
    for(let i = 0; i < h; i++) {
        arr[i] = [];
        for(let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
  }
  
  const queue: [number, number][] = [];
  const before: [number, number][][] = makeArray(width, height, [0,0]);
  const visited: boolean[][] = makeArray(width, height, false);

  const BFS = (y: number, x:number) => {
    visited[y][x] = true;
    queue.push([y,x]);

    while(queue.length != 0) {
      const s = queue.shift() as number[];
      y = s[0];
      x = s[1];
      for (let i = 0 ; i < 4 ; i++) {
			  const newX = x + neighborX[i];
  			const newY = y + neighborY[i];
  			if (isValid(newY, newX, y, x)) {
  				if (grid[newY][newX] == 1) {
  					before[newY][newX] = [y, x];
  					parse_path(newY, newX);
  					return;
  				}
  				if (!visited[newY][newX]) {
  					visited[newY][newX] = true;
  					before[newY][newX] = [y, x];
  					queue.push([newY, newX]);
          }
  			}
			}
    }
  }
  BFS(end.y, end.x)
}