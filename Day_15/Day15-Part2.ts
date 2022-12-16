//dont forget to change index.ts
export default async function Day15() {
  const data = await Deno.readTextFile("Day_15/input.txt");
  // console.log(data);
  type cords = {
    x: number,
    y: number
  }
  type pair = {
    sensor: cords,
    beacon: cords,
    distance: number
  }
  const findDistance = (cord1: cords, cord2: cords): number => {
    return (
      Math.abs(cord1.x-cord2.x) +
      Math.abs(cord1.y-cord2.y)
    )
  }
  let pairs: pair[] = [];
  data.split("\n").forEach((line) => {
    let words = line.split(", ");
    // console.log(words)
    let copy = words[1];
    words[3] = words[2];
    words[0] = words[0].split("at ")[1];
    words[1] = copy.split(": ")[0];
    words[2] = copy.split("at ")[1];
    // console.log("")
    // console.log(words)
    let numcords: number[] = [];
    words.forEach((e) => {
      numcords.push(Number(e.split("=")[1]));
    })
    let sensCords = {x:numcords[0], y:numcords[1]};
    let beaCords = {x:numcords[2], y:numcords[3]};
    pairs.push({sensor: sensCords,
                beacon: beaCords,
                distance: findDistance(sensCords,beaCords)
               })
  })
  // console.log(pairs)
  // this is too slow sadge :(
  for (let i = 0; i < 4_000_000; i++) {
    for(let l = 0; l < 4_000_000; l++) {
      let testCords = {x: i, y:l};
      // console.log(testCords);
      //if testcords already a beacon or sensor
      if (pairs.filter((v) => {
        return (v.sensor.x == testCords.x && v.sensor.y == testCords.y) || (v.beacon.x == testCords.x && v.beacon.y == testCords.y)
      }).length > 0) {
        continue;
      }
      let flag = false;
      for (let j = 0; j < pairs.length; j++) {
        let pair = pairs[j];
        if (findDistance(testCords, pair.sensor) <= pair.distance) {
          flag = true;
        }
      }
      if (!flag) {
        console.log((testCords.x*4_000_000)+testCords.y)
      }
    }
  }
}