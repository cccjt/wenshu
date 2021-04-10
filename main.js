const axios = require('axios');
const wenshu = require('./wenshu');
const qs = require('qs');

(async () => {
  const url = 'https://wenshu.court.gov.cn/website/parse/rest.q4w';
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36',
    Cookie: 'SESSION=4d3229a0-18dc-4291-af5a-c230ea6dae3b;'
  };

  const postData = {
    // pageId: '0.4106386390291614',
    // s8: '02',
    sortFields: 's50:desc',
    ciphertext: wenshu.cipher(),
    pageNum: 2,
    pageSize: 500,
    queryCondition: [{ key: 's12', value: '9299' }],
    cfg: 'com.lawyee.judge.dc.parse.dto.SearchDataDsoDTO@queryDoc',
    __RequestVerificationToken: 'tnTnHEOVTRPsI6Wg4vof7rpr'
  };

  const res = await axios.post(url, qs.stringify(postData), {
    headers: headers,
    timeout: 1000000
  });
  // console.log(res);
  const data = wenshu.DES3.decrypt(res.data.result, res.data.secretKey);
  const jsonData = JSON.parse(data);
  console.log(jsonData.queryResult.resultList);
})();
