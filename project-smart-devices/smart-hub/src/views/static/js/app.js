(async function() {
    $('#addDeviceModal').on('hidden.bs.modal', () => {
        $('#addDeviceModal input').val('');
    });

    $('#addDeviceModal input[name="deviceUrl"]').keypress(function (e) {
        const key = e.which;
        if (key === 13) {
            $('#addDeviceModal button.btn-primary').trigger('click');
            return false;
        }
    });

    $('#addDeviceModal button.btn-primary').click(() => {
        const deviceUrl = $('#addDeviceModal input[name="deviceUrl"]').val();
        if (deviceUrl === undefined || deviceUrl == '') {
            Swal.fire({
                title: 'Hiba',
                text: 'Az eszköz URL nem lehet üres.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        $.ajax({
            data: { deviceUrl },
            dataType: 'json',
            method: 'POST',
            url: '/connect'
        }).then((data) => {
            if (!data.success) {
                Swal.fire({
                    text: 'Hiba történt az eszközhöz való kapcsolódás során.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
        
            if (data.alreadyAdded !== undefined && data.alreadyAdded === true) {
                Swal.fire({
                    text: 'Az eszköz korábban már hozzáadásra került.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
        
            $('#addDeviceModal').modal('hide');
        
            if (data.device.manifest.deviceType === 'thermostat') {
                card = `
                    <div class="card" style="width: 24rem;" deviceId="${data.device.manifest.deviceId}" deviceType="${data.device.manifest.deviceType}">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                ${data.device.manifest.deviceName}
                                <button type="button" class="btn p-0 device-disconnect">×</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Állapot</h5>
                            <div>Fűtés aktív: <span class="thermostat-is-heating">${data.device.status.isHeating ? 'igen' : 'nem'}</span></div>
                            <div>Jelenlegi hőmérséklet: <span class="thermostat-temperature">${data.device.status.temperature}</span>C</div>
                            <div class="mb-3">Termosztát beállítás: <span class="thermostat-threshold">${data.device.status.threshold}</span>C</div>
                            <div class="d-flex align-items-center">
                                <input type="range" class="form-range" name="thermostat-new-threshold" min="10" max="30" value="${data.device.status.threshold}" oninput="this.nextElementSibling.value = this.value">
                                <input type="text" class="form-control form-control-plaintext" readonly style="text-align: right; width: 4rem;" value="${data.device.status.threshold}">
                            </div>
                            <button type="button" class="btn btn-primary thermostat-adjust">Frissítés</button>
                        </div>
                    </div>`;
            }
            else if (data.device.manifest.deviceType === 'bulb') {
                card = `
                    <div class="card" style="width: 24rem;" deviceId="${data.device.manifest.deviceId}" deviceType="${data.device.manifest.deviceType}">
                        <div class="card-header">
                            <div class="d-flex justify-content-between align-items-center">
                                ${data.device.manifest.deviceName}
                                <button type="button" class="btn p-0 device-disconnect">×</button>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Állapot</h5>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <label class="form-check-label">Bekapcsolva</label>
                                    <input type="checkbox" class="form-check-input" name="bulb-on"${data.device.status.on ? ' checked': ''}>
                                </div>
                            </div>
                            <div>
                                <label class="form-label">Fényerő:</label>
                                <div class="d-flex align-items-center">
                                    <input type="range" class="form-range" name="bulb-dim" min="0" max="100" value="${data.device.status.dim}" oninput="this.nextElementSibling.value = this.value">
                                    <input type="text" class="form-control form-control-plaintext" readonly style="text-align: right; width: 4rem;" value="${data.device.status.dim}">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Szín:</label>
                                <input class="form-control form-control-sm bulb-color" data-jscolor="{value:'rgb(${data.device.status.color.red},${data.device.status.color.green},${data.device.status.color.blue})'}">
                            </div>
                            <button type="button" class="btn btn-primary bulb-adjust">Frissítés</button>
                        </div>
                    </div>`;
            }
            else {
                Swal.fire({
                    text: 'Ismeretlen eszköz.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }
        
            $('#container').append(card);
        
            const addedCard = $(`div.card[deviceId="${data.device.manifest.deviceId}"]`);
            if (data.device.manifest.deviceType === 'bulb') {
                jscolor.install(addedCard.get(0));
            }
        
            $(addedCard).find('button.device-disconnect').click(() => {
                $.ajax({
                    dataType: 'json',
                    method: 'POST',
                    url: `/disconnect/${data.device.manifest.deviceId}`
                }).then(() => {
                    $(addedCard).remove();
                    Swal.fire({
                        text: 'Az eszköz sikeresen leválasztásra került.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                });
            });
        
            $(addedCard).find('button.thermostat-adjust').click(() => {
                const newValue = $(addedCard).find('input[name="thermostat-new-threshold"]').val();
                $.ajax({
                    dataType: 'json',
                    data: { newValue },
                    method: 'POST',
                    url: `/adjustThermostat/${data.device.manifest.deviceId}`
                }).then(() => {
                    $(addedCard).find('span.thermostat-threshold').text(newValue);
                    Swal.fire({
                        text: 'Az eszköz beállításainak frissítése befejeződött.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                });
            });
        
            $(addedCard).find('button.bulb-adjust').click(() => {
                const on = $(addedCard).find('input[name="bulb-on"]').is(':checked');
                const dim = parseInt($(addedCard).find('input[name="bulb-dim"]').val());
                let color = $(addedCard).find('input.bulb-color').val();
                color = color.replace('rgb(', '').replace(')', '').split(',');
                const colorRed = parseInt(color[0]);
                const colorGreen = parseInt(color[1]);
                const colorBlue = parseInt(color[2]);
        
                $.ajax({
                    dataType: 'json',
                    data: {
                        on,
                        dim,
                        color: {
                            red: colorRed,
                            green: colorGreen,
                            blue: colorBlue
                        }
                    },
                    method: 'POST',
                    url: `/adjustBulb/${data.device.manifest.deviceId}`
                }).then(() => {
                    Swal.fire({
                        text: 'Az eszköz beállításainak frissítése befejeződött.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                });
            });
        
            Swal.fire({
                text: 'Sikeres kapcsolódás.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        });
    });

    $('#add').click(function (e) {
        e.preventDefault();
        $('#addDeviceModal').modal('show');
    });

    const ws = new WebSocket('ws://localhost:2999/ws');
    const timer = setInterval(() => {
        if (ws.readyState === 1) {
            clearInterval(timer);
            ws.onmessage = (messageEvent) => {
                const message = JSON.parse(messageEvent.data);
                console.log(message);

                const card = $(`div.card[deviceId="${message.deviceId}"]`).first();
                const type = $(card).attr('deviceType');

                if (type === 'thermostat') {
                    $(card).find('span.thermostat-temperature').text(message.value.currentValue);
                    if (message.value.events.indexOf('turning_on_heating') > 0) {
                        $(card).find('span.thermostat-is-heating').text('igen');
                    }
                    else if (message.value.events.indexOf('turning_off_heating') > 0) {
                        $(card).find('span.thermostat-is-heating').text('nem');
                    }
                }
            };
        }
    }, 10);
})();