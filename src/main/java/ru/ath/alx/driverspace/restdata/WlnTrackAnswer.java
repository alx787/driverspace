package ru.ath.alx.driverspace.restdata;

public class WlnTrackAnswer {
    private String status;
    private String message;
    private WlnTrackContent content;

    public WlnTrackAnswer() {
    }

    public WlnTrackAnswer(String status, String message, WlnTrackContent content) {
        this.status = status;
        this.message = message;
        this.content = content;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public WlnTrackContent getContent() {
        return content;
    }

    public void setContent(WlnTrackContent content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "WlnTrackAnswer{" +
                "status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", content=" + content +
                '}';
    }
}


//
//{
//        "status": "OK",
//        "sid": "f8c42ef6c78061865a918ff7cf622029",
//        "content": {
//        "regnom": "А019ЕС  43 RUS",
//        "wlnid": "1932",
//        "invnom": "75127",
//        "duration": "2.90",
//        "motohours": "0.18",
//        "probeg": "55.94",
//        "fuelrate": "5.60",
//        "detail": [
//        {
//        "tracktime": "2020-12-07 05:17:34",
//        "trackbegtime": "07.12.2020-08:17:34",
//        "trackbegx": "49.6038649766",
//        "trackbegy": "58.6099766518",
//        "trackendtime": "07.12.2020-08:21:14",
//        "trackendx": "49.6039849635",
//        "trackendy": "58.6092249836",
//        "datebeg": "07.12.2020-08:17:34",
//        "dateend": "07.12.2020-08:21:14",
//        "placebeg": "ул. Ломоносова 9, Киров",
//        "placebegx": "49.6038649766",
//        "placebegy": "58.6099766518",
//        "placeend": "ул. Кольцова 3, Киров",
//        "placeendx": "49.6039849635",
//        "placeendy": "58.6092249836",
//        "duration": "0.05",
//        "motohours": "0.00",
//        "probeg": "0.24",
//        "maxspeed": "12 km/h",
//        "maxspeedx": "49.603841633",
//        "maxspeedy": "58.6093649824",
//        "fuelrate": "0.02 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-07 12:43:37",
//        "trackbegtime": "07.12.2020-15:43:37",
//        "trackbegx": "49.6037116297",
//        "trackbegy": "58.6093533315",
//        "trackendtime": "07.12.2020-15:49:31",
//        "trackendx": "49.6030899858",
//        "trackendy": "58.6099633245",
//        "datebeg": "07.12.2020-15:43:37",
//        "dateend": "07.12.2020-15:49:31",
//        "placebeg": "ул. Кольцова 3, Киров",
//        "placebegx": "49.6037116297",
//        "placebegy": "58.6093533315",
//        "placeend": "ул. Ломоносова 7а, Киров",
//        "placeendx": "49.6030899858",
//        "placeendy": "58.6099633245",
//        "duration": "0.08",
//        "motohours": "0.00",
//        "probeg": "0.37",
//        "maxspeed": "14 km/h",
//        "maxspeedx": "49.6028516464",
//        "maxspeedy": "58.6092566463",
//        "fuelrate": "0.04 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 04:54:59",
//        "trackbegtime": "08.12.2020-07:54:59",
//        "trackbegx": "49.6030633314",
//        "trackbegy": "58.6100949833",
//        "trackendtime": "08.12.2020-08:14:49",
//        "trackendx": "49.6015433151",
//        "trackendy": "58.5740433281",
//        "datebeg": "08.12.2020-07:54:59",
//        "dateend": "08.12.2020-08:14:49",
//        "placebeg": "ул. Ломоносова 7а, Киров",
//        "placebegx": "49.6030633314",
//        "placebegy": "58.6100949833",
//        "placeend": "ул. Щорса 64, Киров",
//        "placeendx": "49.6015433151",
//        "placeendy": "58.5740433281",
//        "duration": "0.32",
//        "motohours": "0.00",
//        "probeg": "5.37",
//        "maxspeed": "55 km/h",
//        "maxspeedx": "49.6118966419",
//        "maxspeedy": "58.5858149986",
//        "fuelrate": "0.54 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 05:29:42",
//        "trackbegtime": "08.12.2020-08:29:42",
//        "trackbegx": "49.6013899682",
//        "trackbegy": "58.5739916536",
//        "trackendtime": "08.12.2020-08:42:06",
//        "trackendx": "49.6293883327",
//        "trackendy": "58.5888116547",
//        "datebeg": "08.12.2020-08:29:42",
//        "dateend": "08.12.2020-08:42:06",
//        "placebeg": "ул. Щорса 64, Киров",
//        "placebegx": "49.6013899682",
//        "placebegy": "58.5739916536",
//        "placeend": "ул. Ивана Попова 9, Киров",
//        "placeendx": "49.6293883327",
//        "placeendy": "58.5888116547",
//        "duration": "0.20",
//        "motohours": "0.00",
//        "probeg": "4.07",
//        "maxspeed": "51 km/h",
//        "maxspeedx": "49.6129899774",
//        "maxspeedy": "58.5775149866",
//        "fuelrate": "0.41 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 06:34:31",
//        "trackbegtime": "08.12.2020-09:34:31",
//        "trackbegx": "49.6295233233",
//        "trackbegy": "58.5888099993",
//        "trackendtime": "08.12.2020-09:45:14",
//        "trackendx": "49.594948308",
//        "trackendy": "58.5805549981",
//        "datebeg": "08.12.2020-09:34:31",
//        "dateend": "08.12.2020-09:45:14",
//        "placebeg": "ул. Ивана Попова 9, Киров",
//        "placebegx": "49.6295233233",
//        "placebegy": "58.5888099993",
//        "placeend": "ул. Щорса 105, Киров",
//        "placeendx": "49.594948308",
//        "placeendy": "58.5805549981",
//        "duration": "0.17",
//        "motohours": "0.00",
//        "probeg": "4.02",
//        "maxspeed": "49 km/h",
//        "maxspeedx": "49.6252816612",
//        "maxspeedy": "58.5851716666",
//        "fuelrate": "0.40 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 06:51:39",
//        "trackbegtime": "08.12.2020-09:51:39",
//        "trackbegx": "49.5947799994",
//        "trackbegy": "58.5805116637",
//        "trackendtime": "08.12.2020-10:02:09",
//        "trackendx": "49.6013449993",
//        "trackendy": "58.5744033308",
//        "datebeg": "08.12.2020-09:51:39",
//        "dateend": "08.12.2020-10:02:09",
//        "placebeg": "ул. Щорса 105, Киров",
//        "placebegx": "49.5947799994",
//        "placebegy": "58.5805116637",
//        "placeend": "ул. Щорса 64, Киров",
//        "placeendx": "49.6013449993",
//        "placeendy": "58.5744033308",
//        "duration": "0.17",
//        "motohours": "0.07",
//        "probeg": "1.64",
//        "maxspeed": "42 km/h",
//        "maxspeedx": "49.5965749839",
//        "maxspeedy": "58.5799999904",
//        "fuelrate": "0.16 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 07:16:24",
//        "trackbegtime": "08.12.2020-10:16:24",
//        "trackbegx": "49.6015949896",
//        "trackbegy": "58.5748266588",
//        "trackendtime": "08.12.2020-10:33:19",
//        "trackendx": "49.6060116658",
//        "trackendy": "58.6164616464",
//        "datebeg": "08.12.2020-10:16:24",
//        "dateend": "08.12.2020-10:33:19",
//        "placebeg": "ул. Щорса 64, Киров",
//        "placebegx": "49.6015949896",
//        "placebegy": "58.5748266588",
//        "placeend": "ул. Вологодская, Киров",
//        "placeendx": "49.6060116658",
//        "placeendy": "58.6164616464",
//        "duration": "0.27",
//        "motohours": "0.00",
//        "probeg": "5.58",
//        "maxspeed": "55 km/h",
//        "maxspeedx": "49.6136416284",
//        "maxspeedy": "58.5883049896",
//        "fuelrate": "0.56 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 07:39:29",
//        "trackbegtime": "08.12.2020-10:39:29",
//        "trackbegx": "49.6060183294",
//        "trackbegy": "58.6165483153",
//        "trackendtime": "08.12.2020-10:50:12",
//        "trackendx": "49.6390349813",
//        "trackendy": "58.6022899855",
//        "datebeg": "08.12.2020-10:39:29",
//        "dateend": "08.12.2020-10:50:12",
//        "placebeg": "ул. Вологодская, Киров",
//        "placebegx": "49.6060183294",
//        "placebegy": "58.6165483153",
//        "placeend": "ул. Московская, Киров",
//        "placeendx": "49.6390349813",
//        "placeendy": "58.6022899855",
//        "duration": "0.17",
//        "motohours": "0.00",
//        "probeg": "3.95",
//        "maxspeed": "54 km/h",
//        "maxspeedx": "49.6356149972",
//        "maxspeedy": "58.6067849907",
//        "fuelrate": "0.40 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 07:55:41",
//        "trackbegtime": "08.12.2020-10:55:41",
//        "trackbegx": "49.6391233265",
//        "trackbegy": "58.6023266564",
//        "trackendtime": "08.12.2020-11:03:53",
//        "trackendx": "49.6668399753",
//        "trackendy": "58.602204993",
//        "datebeg": "08.12.2020-10:55:41",
//        "dateend": "08.12.2020-11:03:53",
//        "placebeg": "ул. Московская, Киров",
//        "placebegx": "49.6391233265",
//        "placebegy": "58.6023266564",
//        "placeend": "ул. Спасская 53, Киров",
//        "placeendx": "49.6668399753",
//        "placeendy": "58.602204993",
//        "duration": "0.13",
//        "motohours": "0.03",
//        "probeg": "2.36",
//        "maxspeed": "58 km/h",
//        "maxspeedx": "49.6485382993",
//        "maxspeedy": "58.6031933242",
//        "fuelrate": "0.24 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 08:14:47",
//        "trackbegtime": "08.12.2020-11:14:47",
//        "trackbegx": "49.6669099642",
//        "trackbegy": "58.6022216521",
//        "trackendtime": "08.12.2020-11:52:33",
//        "trackendx": "49.6246699918",
//        "trackendy": "58.6126066625",
//        "datebeg": "08.12.2020-11:14:47",
//        "dateend": "08.12.2020-11:52:33",
//        "placebeg": "ул. Спасская 53, Киров",
//        "placebegx": "49.6669099642",
//        "placebegy": "58.6022216521",
//        "placeend": "ул. Лепсе 38, Киров",
//        "placeendx": "49.6246699918",
//        "placeendy": "58.6126066625",
//        "duration": "0.62",
//        "motohours": "0.00",
//        "probeg": "13.93",
//        "maxspeed": "53 km/h",
//        "maxspeedx": "49.6262133097",
//        "maxspeedy": "58.5905699894",
//        "fuelrate": "1.39 l",
//        "fuelavgrate": "10.00 l/100 km"
//        },
//        {
//        "tracktime": "2020-12-08 09:54:50",
//        "trackbegtime": "08.12.2020-12:54:50",
//        "trackbegx": "49.6247466443",
//        "trackbegy": "58.6125083218",
//        "trackendtime": "08.12.2020-13:38:54",
//        "trackendx": "49.6185766416",
//        "trackendy": "58.5885316573",
//        "datebeg": "08.12.2020-12:54:50",
//        "dateend": "08.12.2020-13:38:54",
//        "placebeg": "Детский сад №16",
//        "placebegx": "49.6247466443",
//        "placebegy": "58.6125083218",
//        "placeend": "ул. Калинина, Киров",
//        "placeendx": "49.6185766416",
//        "placeendy": "58.5885316573",
//        "duration": "0.73",
//        "motohours": "0.08",
//        "probeg": "14.41",
//        "maxspeed": "58 km/h",
//        "maxspeedx": "49.6108082937",
//        "maxspeedy": "58.584969998",
//        "fuelrate": "1.44 l",
//        "fuelavgrate": "10.00 l/100 km"
//        }
//        ]
//        }
//        }