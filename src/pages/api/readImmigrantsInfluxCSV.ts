import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import csv from "csvtojson";

export default async function readImmigrantsInfluxCSV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // console.log("inside readImmigrantsInfluxCSV api");
    // console.log(req.method);
    // console.log(req.body);
    const labels = [];
    const numOfImmigrants = [];
    const percentageOfImmigrants = [];

    const response = fs.readFileSync(
      path.join(process.cwd(), "src/pages/api", "immigrationstats.csv"),
      "utf8"
    );

    // console.log(response);

    const immigrationstats = response.split('\n')
    // console.log(immigrationstats.length)
    for(let i=0;i<immigrationstats.length;i++){
      // console.log(immigrationstats[i].replace('\r','').split('\t'))
      labels.push(immigrationstats[i].replace('\r','').split('\t')[0])
      numOfImmigrants.push(immigrationstats[i].replace('\r','').split('\t')[1].replace(/,./g,''))
      percentageOfImmigrants.push(immigrationstats[i].replace('\r','').split('\t')[2])
    }

    // console.log(labels)
    // console.log(numOfImmigrants)

    // const filePath = path.join(
    //   process.cwd(),
    //   "src/pages/api",
    //   "immigrationstats.csv"
    // );
    // console.log(filePath);
    // const jsonArray = await csv({ delimiter: "\t" }).fromFile(filePath);
    // console.log(jsonArray);

    res.status(200).json({
      labels: labels,
      numOfImmigrants: numOfImmigrants,
      percentageOfImmigrants: percentageOfImmigrants,
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      labels: ["1850", "1860"],
      numOfImmigrants: ["2244600", "4138700"],
      percentageOfImmigrants: ["9.7", "13.2"],
    });
  }
}
