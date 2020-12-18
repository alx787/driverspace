var trackviewerosm = {};

trackviewerosm.module = (function () {

    var addObjectsToMap = function(lon, lat, objId, objName, objLabel) {

        // маркер
        var point0 = new OpenLayers.Geometry.Point(parseFloat(lon), parseFloat(lat));
        point0.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        map.layers[1].addFeatures(new OpenLayers.Feature.Vector(point0, { label: "", name: objName, PointId: objId }));


        // надпись
        var point0 = new OpenLayers.Geometry.Point(lon, lat);
        point0.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        map.layers[2].addFeatures(new OpenLayers.Feature.Vector(point0, { label: objLabel, name: objName, ImgId: objId }));

    }


    // добавление метки о превышении
    var addSpeedingObjectsToMap = function(lon, lat, objId, objName, objLabel) {

        // маркер
        var point0 = new OpenLayers.Geometry.Point(parseFloat(lon), parseFloat(lat));
        point0.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        map.layers[4].addFeatures(new OpenLayers.Feature.Vector(point0, { label: "", name: objName, PointId: objId }));


        // надпись
        var point0 = new OpenLayers.Geometry.Point(lon, lat);
        point0.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
        map.layers[2].addFeatures(new OpenLayers.Feature.Vector(point0, { label: objLabel, name: objName, ImgId: objId }));


        var lonlat = new OpenLayers.LonLat(lon, lat);
        map.setCenter(lonlat.transform(
            new OpenLayers.Projection("EPSG:4326"), // переобразование в WGS 1984
            new OpenLayers.Projection("EPSG:900913") // переобразование проекции
            ), 16 // масштаб 17 крут
        );
    }



    //Предполагаемый форма данных: координаты разделены точкой с запятой, долгота с широтой разделены пробелом
//function addLine(lon1, lat1, lon2, lat2, title, ident, layr) {
    var addLine = function(lon1, lat1, lon2, lat2, layer, color) {
        var featuress = Array();

        var point1 = new OpenLayers.Geometry.Point(lon1, lat1);
        point1.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

        var point2 = new OpenLayers.Geometry.Point(lon2, lat2);
        point2.transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

        featuress.push(point1);
        featuress.push(point2);

        //var linearRing2 = new OpenLayers.Geometry.LinearRing(featuress);
        //map.layers[2].addFeatures(linearRing2);


        var vector = new OpenLayers.Layer.Vector();
        var lineString = new OpenLayers.Geometry.LineString(featuress);
        var myLineStyle = {strokeColor:color, strokeWidth:2};
        var myFeature = new OpenLayers.Feature.Vector(lineString, {}, myLineStyle);

        // map.layers[2].addFeatures([myFeature]);
        layer.addFeatures([myFeature]);

    }


    // отрисовка линий по координатам
    var drawLines = function(coords) {

        if (coords.length == 0) {
            return false;
        }

        if (coords.length == 1) {
            var lonlat = new OpenLayers.LonLat(coords[0].x, coords[0].y);
            map.setCenter(lonlat.transform(
                new OpenLayers.Projection("EPSG:4326"), // переобразование в WGS 1984
                new OpenLayers.Projection("EPSG:900913") // переобразование проекции
                )
            );

            addObjectsToMap(coords[0].x, coords[0].y, "p_0", "p_0", coords[0].time);

            return false;
        }



        var lonlat = new OpenLayers.LonLat(coords[0].x, coords[0].y);
        map.setCenter(lonlat.transform(
            new OpenLayers.Projection("EPSG:4326"), // переобразование в WGS 1984
            new OpenLayers.Projection("EPSG:900913") // переобразование проекции
            )
        );


        var begelem = coords[0];
        var endelem = coords[0];

        // маркер начала
        addObjectsToMap(begelem.x, begelem.y, "p_0", "p_0", begelem.time);

        var ii = 0; // счетчик точек

        for (var i = 1; i < coords.length; i++) {

            ii++;
            if (ii >= 100) {
                ii = 0;
                // маркер середины пути
                addObjectsToMap(begelem.x, begelem.y, "p_" + i.toString(), "p_" + i.toString(), begelem.time);
            }

            endelem = coords[i];

            addLine(begelem.x, begelem.y, endelem.x, endelem.y, map.layers[2], "#0500bd");

            begelem = endelem;

        }

        // маркер конца пути
        addObjectsToMap(begelem.x, begelem.y, "p_" + i.toString(), "p_" + i.toString(), begelem.time);

    }


    var initMap = function() {
        map = new OpenLayers.Map("OSMap");//инициализация карты

        var mapnik = new OpenLayers.Layer.OSM();//создание слоя карты

        map.addLayer(mapnik);//добавление слоя

        //создаем новый слой оборудования
        //var layerMarkers = new OpenLayers.Layer.Markers("Equipments");
        //map.addLayer(layerMarkers);//добавляем этот слой к карте

        // слой для размещения изображений - отметок маршрута
        var styleImage = new OpenLayers.Style(
            {
                graphicWidth: 32,
                graphicHeight: 32,
                graphicYOffset: -32,
                label: "${label}",
                externalGraphic: "pages/img/map_marker_icon_32_32.png",
                fontSize: 12
            });


        var layerImage = new OpenLayers.Layer.Vector("Images",
            {
                styleMap: new OpenLayers.StyleMap(
                    { "default": styleImage,
                        "select": { rotation: 45}
                    })
            });


        map.addLayer(layerImage);//добавляем этот слой к карте

        // слой для отображения текстовых меток
        //labelYOffset - сдвиг текста по вертикале относительно точки
        var stylePoint = new OpenLayers.Style(
            {
                pointRadius: 5,
                strokeColor: "red",
                strokeWidth: 2,
                fillColor: "lime",
                labelYOffset: 45,
                label: "${label}",
                fontSize: 16
            });

        //создаем новый слой для текстовых меток
        var layerLables = new OpenLayers.Layer.Vector("Lables", {
            styleMap: new OpenLayers.StyleMap(
                { "default": stylePoint,
                    "select": { pointRadius: 20}
                })
        });

        map.addLayer(layerLables);


        // слой для отображения поездок - линий отображающих маршрут

        //labelYOffset - сдвиг текста по вертикале относительно точки
        var stylePointTrack = new OpenLayers.Style(
            {
                pointRadius: 10,
                strokeColor: "blue",
                strokeWidth: 5,
                fillColor: "black",
                labelYOffset: 20,
                label: "${label}",
                fontSize: 16
            });

        var layerTracks = new OpenLayers.Layer.Vector("Tracks", {
            styleMap: new OpenLayers.StyleMap(
                { "default": stylePointTrack,
                    "select": { pointRadius: 20}
                })
        });

        map.addLayer(layerTracks);


        // слой для изображений превышения скорости
        var styleImageSpeeding = new OpenLayers.Style(
            {
                graphicWidth: 32,
                graphicHeight: 32,
                graphicYOffset: -38,
                label: "${label}",
                externalGraphic: "pages/img/attention_48.png",
                fontSize: 12
            });


        var layerImageSpeeding = new OpenLayers.Layer.Vector("ImagesSpeeding",
            {
                styleMap: new OpenLayers.StyleMap(
                    { "default": styleImageSpeeding,
                        "select": { rotation: 45}
                    })
            });


        map.addLayer(layerImageSpeeding);

        // шкала для выбора заранее настроенного масштаба
        //map.addControl(new OpenLayers.Control.PanZoomBar());

        // панель инструментов (сдвиг и масштабирование)
        //map.addControl(new OpenLayers.Control.MouseToolbar());

        // переключатель видимости слоев
        // map.addControl(new OpenLayers.Control.LayerSwitcher({'ascending':false}));

        // ссылка внизу карты на текущее положение/масштаб
        // map.addControl(new OpenLayers.Control.Permalink());
        // map.addControl(new OpenLayers.Control.Permalink('permalink'));

        // координаты текущего положения мыши
        // преобразование из метров в градусы с помощью proj4js
        map.addControl(
            new OpenLayers.Control.MousePosition({
                displayProjection: new OpenLayers.Projection('EPSG:4326')
            })
        );

        // обзорная карта
        // map.addControl(new OpenLayers.Control.OverviewMap());

        // горячие клавиши
        map.addControl(new OpenLayers.Control.KeyboardDefaults());


        addObjectsToMap(49.602077, 58.610018, "atx", "atx", "ОАО АТХ");


        // addLine(49.602077, 58.610018, 49.603077, 58.611018, null, null, null);



        var lonlat = new OpenLayers.LonLat(49.602077, 58.610018);
        map.setCenter(lonlat.transform(
            new OpenLayers.Projection("EPSG:4326"), // переобразование в WGS 1984
            new OpenLayers.Projection("EPSG:900913") // переобразование проекции
            ), 16 // масштаб 17 крут
        );


    }


    return {
        initMap:initMap,
        drawLines:drawLines,
        addSpeedingObjectsToMap:addSpeedingObjectsToMap
    }
}());