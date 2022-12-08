//dont forget to change index.ts
export default async function Day7() {
  const data = await Deno.readTextFile("Day_7/input.txt");
  let args: string[][] = []
  data.split("\n").forEach(e => args.push(e.split(" ")))

  enum filetype {
    file,
    folder
  }
  type Node = {
    name: string
    size: number
    parent: Node | null,
    children: Node[] | null
    type: filetype
  }

  const printTree = (node: Node, tabs: number = 0) => {
    let type = "";
    node.type == filetype.file ? type = "File" : type = "Folder";
    if (tabs > 0) {
      console.log("\t".repeat(tabs), `NODE: ${node.name}, TYPE: ${type}, SIZE: ${node.size}, PARENT: ${node.parent?.name}`)
    }
    else {
      console.log(`NODE: ${node.name}, SIZE: ${node.size}, PARENT: ${node.parent?.name}`)
    }
    if (node.type === filetype.folder) {
      node.children?.forEach(e => {
        printTree(e, tabs+1)
      })
    }
  }

  let root: Node = {
    name: "/",
    size: 0,
    parent: null,
    children: [],
    type: filetype.folder
  }

  let curDir = root;
  //dont need first line since we know we are starting at root
  args.shift();
  //console.log(args);
  
  args.forEach((command) => {
    if (command[0] === "$") {
      if (command[1] === "cd"){
        if (command[2] === "..") {
          curDir = curDir.parent as Node;
          return;
        }
        curDir = curDir.children?.find(e => e.name == command[2]) as Node;
      } 
      else {
        //command[1] == "ls"
        return;
      }
    } 
    else if (command[0] === "dir") {
      curDir.children?.push({
        name: command[1],
        size: 0,
        parent: curDir,
        children: [],
        type: filetype.folder
      })
    } 
    else {
      //command[0] == a number
      curDir.children?.push({
          name: command[1],
          size: Number(command[0]),
          parent: curDir,
          children: null,
          type: filetype.file
        })
    }
  })
  //printTree(root);
  let dirSizes: number[] = [];
  const DFS = (node: Node): number => {
    if (node.type === filetype.folder) {
      let total = 0;
      node.children?.forEach(e => {
        if (e.type === filetype.folder) {
          e.size = DFS(e)
        }
        total += e.size;
      })
      dirSizes.push(total);
      return total;
    } else {
      throw "DFS called on file";
    }
  }

  root.size = DFS(root);
  //printTree(root);
  dirSizes = dirSizes.filter(e => e <= 100_000)
  let final = dirSizes.reduce((x,y) => x+y)
  console.log(final)
}