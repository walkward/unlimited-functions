exports.updateOrderTag = function updateOrderTag (req, res) {
  res.send(console.log(req.body.id));
  console.log(req.body.id);
  var http = require("https");
  var orderID = req.body.id;
  var noteVal = req.body.note;

  var options = {
    "method": "PUT",
    "hostname": "media-marketplace.myshopify.com",
    "port": null,
    "path": "/admin/orders/"+orderID+".json",
    "headers": {
      "authorization": "Basic NzdhMjJmMWViYjA3ZjVlMWM3MTQ3ZWZkNjljNzM4ZDc6MmNkYmVlNDE3ZTA0ZjQzNzU1Y2ExNTU3YTJmNjBiNGM=",
      "content-type": "application/json",
      "cache-control": "no-cache",
      "postman-token": "3a3d81e2-ddd5-c889-d15b-7e0e24524893"
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(JSON.stringify({ order: { id: orderID, tags: noteVal } }));
  req.end();
};
