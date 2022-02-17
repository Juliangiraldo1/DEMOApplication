$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJub21icmUiOiJlcmljIiwiZW1haWwiOiJlcmljQGhvdC5jb20ifSwiaWF0IjoxNjQ1MDUyOTY0LCJleHAiOjE2NDUwNTY1NjR9.__gUZ6pYkXb688IGOn_G9jbsMxi8owaYegBpuxZu4j0"
        },
    });

    $('#registrar').click(function() {

        const api = 'http://localhost:3000/demo';
        const data = {
            "ID_DEM": "0",
            "NOMBRE_DEM": $("#NOMBRE_DEM").val(),
            "LINK_DEM": $("#LINK_DEM").val(),
            "DESCRIPCION_DEM": $("#DESCRIPCION_DEM").val(),
            "NOMBRE_GEN": $("#NOMBRE_GEN").val(),
            "NICKNAME_ART": $("#NICKNAME_ART").val(),
            "NOMBRE_SUB": $("#NOMBRE_SUB").val()
        }

        $.ajax({
            url: api,
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function() {
                alert('Demo registrado correctamente!')
            },
            error: function(err) {
                alert('Error!', err)
            }
        });
    });

    $('#buscar').click(function() {

        //Limpiar registros traidos en consultas anteriores
        $('#demos').empty();

        //Obtener artista
        var NICKNAME_ART = document.getElementById('NICKNAME_ART').value;
        NICKNAME_ART = NICKNAME_ART.replace(/ /g, "%20");
        sessionStorage.setItem('artista', NICKNAME_ART)

        var lista = document.getElementById('demos');
        lista.innerHTML += '<option selected="true" disabled="disabled">Seleccione un demo disponible</option>'

        var demo = "";
        const API = 'http://localhost:3000/demo/search/' + NICKNAME_ART;
        $.get(API, function(demos, status) {
            console.log(`${status}`);

            for (var i = 0; i < demos.length; i++) {
                demo = JSON.stringify(demos[i].NOMBRE_DEM)
                demo = demo.replace(/['"]+/g, '') //Eliminar las comillas del string
                var listaDemos = '<option>' + demo + '</option>';
                lista.innerHTML += listaDemos;
            }
        });

    });

    $('#editar').click(function() {

        //Obtener demo seleccionado
        var listaDemos = document.getElementById("demos");
        var demo = listaDemos.options[listaDemos.selectedIndex].text;
        console.log(demo);

        sessionStorage.setItem('demo', demo)

    });

    $('#eliminar').click(function() {

        //Obtener demo seleccionado
        var listaDemos = document.getElementById("demos");
        var demo = listaDemos.options[listaDemos.selectedIndex].text;
        console.log(demo);

        //Nombre del artista que registro el demo
        var art = sessionStorage.getItem('artista');
        var id = "";

        //Petición GET para consultar el id del demo según su nombre y el artista
        const API = 'http://localhost:3000/demo/search/' + art + '/' + demo;
        $.get(API, function(demos, status) {
            console.log(`${status}`);

            id = JSON.stringify(demos[0].ID_DEM)
            console.log(id)

            //Petición tipo delete para el eliminar el demo por su id
            $.ajax({
                url: 'http://localhost:3000/demo/' + id,
                type: 'DELETE',
                success: function(res) {
                    alert('Demo eliminado correctamente!');
                },
                error: function(err) {
                    alert('Error!', err)
                }
            });
        });
    });

})