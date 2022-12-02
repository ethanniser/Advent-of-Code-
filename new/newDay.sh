cat new/tree.txt
printf "\n"
echo "ITS A NEW DAY OF ADVENT OF CODE!"
printf "\n...\n\n"
mkdir Day_$1
cd Day_$1
touch input.txt
touch test.txt
touch Day$1-Part1.ts
printf "////dont forget to change index.ts\nexport default async function Day$1() {\n  const data = await Deno.readTextFile(\"Day_$1/input.txt\");\n  console.log(data);\n}" > Day$1-Part1.ts
touch Day$1-Part2.ts
printf "////dont forget to change index.ts\nexport default async function Day$1() {\n  const data = await Deno.readTextFile(\"Day_$1/input.txt\");\n  console.log(data);\n}" > Day$1-Part2.ts
echo "NEW DAY TEMPLATE WRITTEN SUCESSFULLY"

cd ../
printf "import main from \'./Day_$1/Day$1-Part1.ts\';\nmain();" > index.ts
echo "INDEX.TS UPDATED SECESSFULLY"