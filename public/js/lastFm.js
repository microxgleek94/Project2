console.log("lastFm loaded");

$(document).ready(() => {
  const lastFMKey = config2.fm1 + config2.fm2 + config2.fm3;
  let InputUser = "";

  function clear() {
    $("#searchResults").empty();
  }
  function ajaxCall() {
    // Get API key. =
    // var queryURL = `http://ws.audioscrobbler.com/2.0/?api_key=${lastFMKey}&format=json&method=track.search&track=` + InputUser;
    const queryURL =
      // `http://ws.audioscrobbler.com/2.0/?api_key=${lastFMKey}&format=json&method=artist.gettoptracks&artist=` +
      `https://ws.audioscrobbler.com/2.0/?api_key=${lastFMKey}&format=json&method=track.search&track=${InputUser}`;
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(data => {
      console.log(data);
      clear();
      //get picture from album

      for (let i = 0; i < 40; i++) {
        const artist = data.results.trackmatches.track[i].artist;
        const albumUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=${lastFMKey}&format=json&artist=${artist}`;
        $.get(albumUrl, albumData => {
          const image = albumData.topalbums.album[i].image[1]["#text"];

          const bootstrapCardEl = $(
            "<div class=\"card bg-transparent\" style=\"width: 12rem;\"></div>"
          );
          const cardImgEl = $("<img src=" + image + "></img>");
          const cardBodyEl = $(
            '<div class="card-body">' +
              "<h5>" +
              data.results.trackmatches.track[i].artist +
              "</h5>" +
              "</div>"
          );
          const h5El = $(
            "<h5 class=\"card-title\">" +
              data.results.trackmatches.track[i].name +
              "</h5>"
          );
          const bodytemp = $(
            '<p class="card-text">' +
              "<a href=" +
              data.results.trackmatches.track[i].url +
              " target='_blank'>" +
              "Listen Here!</a>" +
              "</p>"
          );

          cardBodyEl.append(h5El).append(bodytemp);
          bootstrapCardEl.append(cardImgEl).append(cardBodyEl);
          $("#searchResults").append(bootstrapCardEl);
        });
      }
    });
  }
  function ajaxCall2() {
    const albQueryURL = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=${lastFMKey}&format=json&artist=${InputUser}`;
    $.ajax({
      url: albQueryURL,
      method: "GET"
    }).then(data => {
      console.log(data);
      clear();
      for (let i = 0; i < 40; i++) {
        const bootstrapCardEl = $(
          '<div class="card bg-transparent" style="width: 12rem;"></div>'
        );
        const cardImgEl = $(
          "<img src=" + data.topalbums.album[i].image[1]["#text"] + "></img>"
        );
        const cardBodyEl = $(
          '<div class="card-body">' +
            "<h5>" +
            data.topalbums.album[0].artist.name +
            "</h5>" +
            "</div>"
        );
        const h5El = $(
          "<h5 class=\"card-title\">" + data.topalbums.album[i].name + "</h5>"
        );
        const bodytemp = $(
          '<p class="card-text">' +
            "<a href=" +
            data.topalbums.album[i].url +
            " target='_blank'>" +
            "Listen Here!</a>" +
            "</p>"
        );

        cardBodyEl.append(h5El).append(bodytemp);
        bootstrapCardEl.append(cardImgEl).append(cardBodyEl);
        $("#searchResults").append(bootstrapCardEl);
      }
    });
  }

  const searchElement = $("#songSearch");
  searchElement.click(() => {
    InputUser = $("#search-bar").val();
    ajaxCall();
  });

  const searchElementalbum = $("#albumSearch");
  searchElementalbum.click(() => {
    InputUser = $("#search-bar").val();
    ajaxCall2();
  });
});
