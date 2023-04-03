const url = document.getElementById('site');

const resultsBody = document.getElementById('resultsTableBody');
const getSitesToTest = async () => {
    const response = await fetch('sitesTested');
    const sites = await response.json();
    return sites;
}

const testSite = async () => {
    url.checkValidity();
    url.reportValidity();
    console.log(url.validity);
    if (!url.validity.valid)
        return;

    const response = await fetch(`http://localhost:3000/testSite?url=${url.value}`);
    const result = await response.json();
    console.log('====================================');
    console.log(result);
    console.log('====================================');
    const createTableRow = (result) => {
        const tr = document.createElement('tr');
        const cols = ['code', 'type', 'message', 'context'];
        cols.forEach(col => {
            const td = document.createElement('td');
            td.innerText = result[col];
            tr.appendChild(td);
        });
        if (result.type === 'error')
            tr.classList.add('error');
        return tr;
    }
    result.issues.forEach(r => {
        //insert each entry of result into table
        const tr = createTableRow(r);
        resultsBody.appendChild(tr);
    });
}
