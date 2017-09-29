var _ = require('lodash');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'))
var parseString = require('xml2js').parseString;

var cf = require('cloudflare')({
  email: process.env.CLOUDFLARE_EMAIL,
  key: process.env.CLOUDFLARE_KEY
});

async function main() {
  let zones = await cf.zones.browse();
  let zone = _.find(zones.result, { name: process.argv[2] })
  //console.log(zone);
  if (!zone) throw new Error("zone not found");

  let records = await cf.dnsRecords.browse(zone.id);
  if (records.result.length > 0) {
    console.log(records.result);
    throw new Error("already imported. please clean first");
  }

  let xml = (await fs.readFileAsync(process.argv[3])).toString("utf-8");
  let result = await Promise.fromNode((callback) => parseString(xml, callback));
  let items = result.rdataset.rdata;

  for (var i = 0; i < items.length; i++) {
    let item = items[i];
    console.log(item);
    await cf.dnsRecords.add(zone.id, {
      type: item.type[0],
      name: item.host[0],
      content: item.rd_data[0],
      ttl: item.rdata_ttl[0],
      priority: item.rr_pref[0] != 'N/A' ? item.rr_pref[0] : undefined,
      proxied: false,
    });
  }
}


main().catch((e) => {
  console.error(e)
})