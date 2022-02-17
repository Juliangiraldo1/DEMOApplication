$(document).ready(function() {

    $.ajaxSetup({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJub21icmUiOiJlcmljIiwiZW1haWwiOiJlcmljQGhvdC5jb20ifSwiaWF0IjoxNjQ1MDUyOTY0LCJleHAiOjE2NDUwNTY1NjR9.__gUZ6pYkXb688IGOn_G9jbsMxi8owaYegBpuxZu4j0"
        },
    });

    //Obtener demo seleccionado
    var demo = sessionStorage.getItem('demo');
    console.log(demo)

    //Nombre del artista que registro el demo
    var art = sessionStorage.getItem('artista');
    console.log(art)

    //Petición GET para consultar el id del demo según su nombre y el artista
    const API = 'http://localhost:3000/demo/search/' + art + '/' + demo;
    $.get(API, function(demos, status) {
        console.log(`${status}`);
        console.log(JSON.stringify(demos))

        //Ingresar información del demo a actualizar en el formulario
        $('#name').val(JSON.stringify(demos[0].NICKNAME_ART).replace(/['"]+/g, ''));
        $("#cancion").val(JSON.stringify(demos[0].NOMBRE_DEM).replace(/['"]+/g, ''));
        $("#link").val(JSON.stringify(demos[0].LINK_DEM).replace(/['"]+/g, ''));
        $("#descripcion").val(JSON.stringify(demos[0].DESCRIPCION_DEM).replace(/['"]+/g, ''));
        $("#genero").val(JSON.stringify(demos[0].NOMBRE_GEN).replace(/['"]+/g, ''));
        $("#subgenero").val(JSON.stringify(demos[0].NOMBRE_SUB).replace(/['"]+/g, ''));

    });

    $('#actualizar').click(function() {

        //Obtener demo seleccionado
        var demo_name = sessionStorage.getItem('demo');
        console.log(demo_name)

        //Nombre del artista que registro el demo
        var art = sessionStorage.getItem('artista');
        console.log(art)

        //Petición GET para consultar el id del demo según su nombre y el artista
        const API = 'http://localhost:3000/demo/search/' + art + '/' + demo_name;
        $.get(API, function(demos, status) {
            console.log(`${status}`);
            id_dem = JSON.stringify(demos[0].ID_DEM)
            console.log(id_dem)

            //obtener datos actualizados
            const data = {
                "NOMBRE_DEM": $("#cancion").val(),
                "LINK_DEM": $("#link").val(),
                "DESCRIPCION_DEM": $("#descripcion").val(),
                "NOMBRE_GEN": $("#genero").val(),
                "NICKNAME_ART": $("#name").val(),
                "NOMBRE_SUB": $("#subgenero").val()
            }

            const API = 'http://localhost:3000/demo/' + id_dem;
            //Petición para actualizar demo
            $.ajax({
                url: API,
                type: 'put',
                dataType: 'json',
                data: JSON.stringify(data),
                success: function() {
                    alert('Demo actualizado correctamente!')
                },
                error: function(err) {
                    alert('Error!', err)
                }
            });

        });


    });

});