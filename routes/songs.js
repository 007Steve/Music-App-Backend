const express = require("express");
const router = express.Router();


//SONGS
router.get("/songs", (req, res) => {
    res.send([
      {
        id: "1",
        song: "Droplet",
        artist: "Kupla",
        cover:
          "https://chillhop.com/wp-content/uploads/2020/07/888ce90dd44b73f819413e20d744bc00e6f9adac-1024x1024.jpg",
        audio: "https://mp3.chillhop.com/serve.php/?mp3=10075",
        color: ["#205950", "#2ab3bf"],
        active: true,
        position: "first",
      },
      {
        id: "2",
        song: "Daylight",
        artist: "Aiguille",
        cover:
          "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
        audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
        color: ["#EF8EA9", "#ab417f"],
        active: false,
        position: "second",
      },
      {
        id: "3",
        song: "Keep Going",
        artist: "Swørn",
        cover:
          "https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
        audio: "https://mp3.chillhop.com/serve.php/?mp3=9222",
        color: ["#CD607D", "#c94043"],
        active: false,
        position: "third",
      },
      {
        id: "4",
        song: "Through",
        artist: "Monma",
        cover:
          "https://chillhop.com/wp-content/uploads/2020/07/b8792fcb926a79c2410b9bcd32837e206d474e32-1024x1024.jpg",
        audio: "https://mp3.chillhop.com/serve.php/?mp3=10075",
        color: ["#205950", "#2ab3bf"],
        active: true,
        position: "first",
      },
      {
        id: "5",
        song: "Reality",
        artist: "chromonicci",
        cover:
          "https://www.stereofox.com/wp-content/uploads/2021/01/ab67616d0000b2737ad3d29b2bb029dc51b30c19.jpg",
        audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
        color: ["#EF8EA9", "#ab417f"],
        active: false,
        position: "second",
      },
      {
        id: "6",
        song: "Amen",
        artist: "Logic",
        cover:
          "https://upload.wikimedia.org/wikipedia/en/4/4c/Logic_No_Pressure_album_cover.jpeg",
        audio: "https://mp3.chillhop.com/serve.php/?mp3=9222",
        color: ["#CD607D", "#c94043"],
        active: false,
        position: "third",
      },
    ]);

});

module.exports = router;