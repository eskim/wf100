const axios = require('axios');
const fs = require('fs-extra');
const dayjs = require('dayjs');



(async () => {
  let codes = (await fs.readFile("./codes.lst")).toString().split(/\n/);
  codes = codes.slice(0, 10)
  let ymd = dayjs().format('YYYYMMDD')
  // console.log(codes)

  let res = {}
  for(var i in codes){
    let cd = codes[i]
    let url = `https://navercomp.wisereport.co.kr/company/ajax/c1050001_data.aspx?flag=2&cmp_cd=${cd}&finGubun=IFRSL&frq=0&sDT=${ymd}&chartType=svg`
    let {data} = await axios(url)
    res[cd] = data
  }

  await fs.writeJSON(__dirname + "/d/" + ymd + ".json", res)
})();