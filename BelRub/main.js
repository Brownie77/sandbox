const renderCurrency = async (url) => {
  let content = document.getElementById('data').innerHTML;
  const data = await fetch(url)
    .then(response => response.json())
    .then(json => variable = json)
  Object.values(data).forEach(key => {
    content += `
      <tr>
      <td>${key.Cur_Name}</td>
      <td>${key.Cur_Scale + ' ' + key.Cur_Abbreviation}</td>
      <td>${key.Cur_OfficialRate}</td>
      </tr>
    `;
  })
  document.getElementById('data').innerHTML = content;
}
renderCurrency('https://www.nbrb.by/api/exrates/rates?periodicity=0')

