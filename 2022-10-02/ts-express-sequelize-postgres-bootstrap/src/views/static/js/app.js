function loadVehicleList() {
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: '/api/vehicles'
    }).done((data) => {
        for (let vehicle of data) {
            let html = `
                <tr>
                    <td>${vehicle.id}</td>
                    <td>${vehicle.brand}</td>
                    <td>${vehicle.model}</td>
                    <td>${vehicle.color}</td>
                    <td class="d-flex gap-2">
                        <a href="/vehicles/edit/${vehicle.id}" class="btn btn-warning btn-sm">Módosítás</a>
                        <form method="post" action="/vehicles/delete/${vehicle.id}">
                            <button type="submit" class="btn btn-danger btn-sm">Törlés</button>
                        </form>
                    </td>
                </tr>
            `;
            $(html).appendTo($('table#vehicles > tbody'));
        }
    });
}

function loadSingleVehicle(id) {
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: '/api/vehicles/' + id
    }).done((data) => {
        $('input#id').val(data.id);
        $('input#brand').val(data.brand);
        $('input#model').val(data.model);
        $('input#color').val(data.color);
    });
}