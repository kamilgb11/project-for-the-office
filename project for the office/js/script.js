document.addEventListener('DOMContentLoaded', function () {
    const kolor1Input = document.getElementById('kolor1');
    const kolor2Input = document.getElementById('kolor2');
    const tbody = document.querySelector('tbody');
    if (kolor1Input && kolor2Input && tbody) {
        function applyRowColors() {
            const kolor1 = kolor1Input.value;
            const kolor2 = kolor2Input.value;
            tbody.querySelectorAll('tr').forEach((row, index) => {
                row.style.backgroundColor = index % 2 === 0 ? kolor1 : kolor2;
            });
        }

        kolor1Input.addEventListener('change', applyRowColors);
        kolor2Input.addEventListener('change', applyRowColors);
        applyRowColors();
    }

    const fakturaRows = document.querySelectorAll('.kwota-netto, .ilosc, .vat');
    if (fakturaRows.length > 0) {
        function updateInvoice() {
            document.querySelectorAll('tbody tr').forEach(row => {
                const kwotaNetto = parseFloat(row.querySelector('.kwota-netto').value);
                const ilosc = parseInt(row.querySelector('.ilosc').value);
                const vat = parseFloat(row.querySelector('.vat').value);
                const kwotaBrutto = kwotaNetto * (1 + vat);
                const wartoscNetto = kwotaNetto * ilosc;
                const wartoscBrutto = kwotaBrutto * ilosc;

                row.querySelector('.kwota-brutto').textContent = kwotaBrutto.toFixed(2);
                row.querySelector('.wartosc-netto').textContent = wartoscNetto.toFixed(2);
                row.querySelector('.wartosc-brutto').textContent = wartoscBrutto.toFixed(2);
            });
        }

        document.querySelectorAll('.kwota-netto, .ilosc, .vat').forEach(input => {
            input.addEventListener('change', updateInvoice);
        });
        updateInvoice();

        document.getElementById('powyzej-1000-netto').addEventListener('click', () => {
            document.querySelectorAll('tbody tr').forEach(row => {
                const kwotaNetto = parseFloat(row.querySelector('.kwota-netto').value);
                if (kwotaNetto > 1000) {
                    row.style.backgroundColor = 'green';
                } else {
                    row.style.backgroundColor = '';
                }
            });
        });
    }

    const delegacjeTbody = document.getElementById('delegacje-tbody');
    if (delegacjeTbody) {
        fetch('php/get_delegacje.php')
            .then(response => response.json())
            .then(data => {
                data.forEach((delegacja, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${delegacja.imie_nazwisko}</td>
                        <td>${delegacja.data_od}</td>
                        <td>${delegacja.data_do}</td>
                        <td>${delegacja.miejsce_wyjazdu}</td>
                        <td>${delegacja.miejsce_przyjazdu}</td>
                    `;
                    delegacjeTbody.appendChild(row);
                });
            });
    }

    const kontrahenciTbody = document.getElementById('kontrahenci-tbody');
    const dodajKontrahentaBtn = document.getElementById('dodaj-kontrahenta');
    const edytujKontrahentaBtn = document.getElementById('edytuj-kontrahenta');
    const usunKontrahentaBtn = document.getElementById('usun-kontrahenta');

    if (kontrahenciTbody) {
        fetch('php/get_kontrahenci.php')
            .then(response => response.json())
            .then(data => {
                data.forEach(kontrahent => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${kontrahent.nip}</td>
                        <td>${kontrahent.regon}</td>
                        <td>${kontrahent.nazwa}</td>
                        <td>${kontrahent.czy_platnik_vat ? 'Tak' : 'Nie'}</td>
                        <td>${kontrahent.ulica}</td>
                        <td>${kontrahent.numer_domu}</td>
                        <td>${kontrahent.numer_mieszkania}</td>
                    `;
                    kontrahenciTbody.appendChild(row);
                });
            });

        dodajKontrahentaBtn.addEventListener('click', () => {
            const nip = document.getElementById('nip').value;
            const regon = document.getElementById('regon').value;
            const nazwa = document.getElementById('nazwa').value;
            const czyPlatnikVat = document.getElementById('czy-platnik-vat').checked;
            const ulica = document.getElementById('ulica').value;
            const numerDomu = document.getElementById('numer-domu').value;
            const numerMieszkania = document.getElementById('numer-mieszkania').value;

            fetch('php/add_kontrahent.php', {
                method: 'POST',
                body: JSON.stringify({ nip, regon, nazwa, czyPlatnikVat, ulica, numerDomu, numerMieszkania }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${nip}</td>
                            <td>${regon}</td>
                            <td>${nazwa}</td>
                            <td>${czyPlatnikVat ? 'Tak' : 'Nie'}</td>
                            <td>${ulica}</td>
                            <td>${numerDomu}</td>
                            <td>${numerMieszkania}</td>
                        `;
                        kontrahenciTbody.appendChild(row);
                    }
                });
        });

        edytujKontrahentaBtn.addEventListener('click', () => {
            const nip = document.getElementById('nip').value;
            const regon = document.getElementById('regon').value;
            const nazwa = document.getElementById('nazwa').value;
            const czyPlatnikVat = document.getElementById('czy-platnik-vat').checked;
            const ulica = document.getElementById('ulica').value;
            const numerDomu = document.getElementById('numer-domu').value;
            const numerMieszkania = document.getElementById('numer-mieszkania').value;

            fetch('php/edit_kontrahent.php', {
                method: 'POST',
                body: JSON.stringify({ nip, regon, nazwa, czyPlatnikVat, ulica, numerDomu, numerMieszkania }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const rows = kontrahenciTbody.querySelectorAll('tr');
                        rows.forEach(row => {
                            if (row.cells[0].textContent === nip) {
                                row.cells[1].textContent = regon;
                                row.cells[2].textContent = nazwa;
                                row.cells[3].textContent = czyPlatnikVat ? 'Tak' : 'Nie';
                                row.cells[4].textContent = ulica;
                                row.cells[5].textContent = numerDomu;
                                row.cells[6].textContent = numerMieszkania;
                            }
                        });
                    }
                });
        });

        usunKontrahentaBtn.addEventListener('click', () => {
            const nip = document.getElementById('nip').value;

            fetch('php/delete_kontrahent.php', {
                method: 'POST',
                body: JSON.stringify({ nip }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const rows = kontrahenciTbody.querySelectorAll('tr');
                        rows.forEach(row => {
                            if (row.cells[0].textContent === nip) {
                                row.remove();
                            }
                        });
                    }
                });
        });
    }
});
