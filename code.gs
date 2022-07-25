function doGet(e) {
  const html = `
<form action="${ScriptApp.getService().getUrl()}" method="GET" target="top">
  <label>パスワードを入力してください: <input type="password" name="genPass"></label>
  <input type="submit" value="ログイン">
</from>
`
  if (typeof e.parameter === 'undefined') {
    return HtmlService.createHtmlOutput(html);
  } else if (typeof e.parameter.genToken === 'undefined') {
    return HtmlService.createHtmlOutput(html);
  } else {
    const pass = getFileContentByName('GEN_PASS.txt');
    if (e.parameter.genPass === pass) {
      const len = 16
      const chars =
        'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVGXYZ!@#$+_'
      let res = ''
      for (let i = 0; i < len; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      const old = getFileContentByName('CODES.txt');
      DriveApp.getFilesByName('CODES.txt').next().setContent(old + "\n" + res);
      return HtmlService.createHtmlOutput(`<h1>生成しました!</h1><p>新しく生成されたコードは下記を参照してください.<br>コードを返信してください </p><span>====以下がトークンです====</span><pre>${res}</pre>`);
    } else {
      return HtmlService.createHtmlOutput('<b>値が不正なため、ログインできません</b>');
    }
  }
}

function doPost(e) {
  if (typeof e.parameter === 'undefined') {
    return ContentService.createTextOutput('wrong app token')
  }
  if (typeof e.parameter.check_app_token !== 'undefined') {
    const res = e.parameter.check_app_token === getFileContentByName('APP_TOKEN.txt')
    return ContentService.createTextOutput(res.toString());
  } if (typeof e.parameter.APP_TOKEN !== 'undefined' && typeof e.parameter.code !== 'undefined') {
    if (e.parameter.APP_TOKEN === getFileContentByName('APP_TOKEN.txt')) {
      const codes = getFileContentByName('CODES.txt').split("\n");
      const res = codes.includes(e.parameter.code);
      if (res) {
        const newf = codes.filter((v) => v !== e.parameter.code).join("\n");
        DriveApp.getFilesByName('CODES.txt').next().setContent(newf);
      }
      return ContentService.createTextOutput(res.toString());
    } else {
      return ContentService.createTextOutput('wrong App token');
    }
  }
  return ContentService.createTextOutput('wrong App token');
}

function getFileContentByName(name) {
  return DriveApp.getFilesByName(name).next().getAs("text/plain").getDataAsString();
}
