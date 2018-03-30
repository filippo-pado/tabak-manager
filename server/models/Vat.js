var mongoose = require('mongoose');
var moment = require('moment');
var fs = require('fs');
var request = require('request');

const {
  spawn
} = require('child_process');

var VatSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  sentXML: String,
  responseXML: String,
  responseCode: Number
});

VatSchema.statics.sendVat = function sendVat(vat, callback) {
  if (process.env.NODE_ENV === 'dev') {
    return next(new Error('Cant send vats in develop mode!'));
  }
  return this.find().sort({
    'date': -1
  }).exec(function (err, vats) {
    if (err) return callback(err);
    sendXML(vat, vats[0], vats.length, function (err, newVat) {
      if (err) return callback(err);
      Vat.create(newVat, callback);
    });
  });
};

function sendXML(vat, lastVat, sequenceID, callback) {
  fs.writeFile('./server/signature/vat.xml', generateXML(vat, lastVat, sequenceID), function (err) {
    if (err) return callback(err);
    const ls = spawn('java', ['-jar', './server/signature/Sign.jar', './server/certificates/device.p12', './server/signature/vat.xml', './server/signature/vatSigned.xml']);
    ls.on('exit', (code) => {
      if (code !== 0) return callback('Error executing java sign!');
      fs.readFile('./server/signature/vatSigned.xml', function (err, data) {
        if (err) return callback(err);
        vat.sentXML = data;
        let options = {
          rejectUnauthorized: false,
          url: "https://apid-ivaservizi.agenziaentrate.gov.it/v1/dispositivi/",
          headers: {
            'Content-Type': 'application/xml'
          }
        };
        fs.createReadStream('./server/signature/vatSigned.xml')
          .pipe(request //cambiare con vatSigned
            .post(options, function (err, httpResponse, body) {
              vat.responseCode = httpResponse.statusCode; // 200
              vat.responseXML = body.toString();
              callback(null, vat);
            })
          );
      })
    });
  });
}

function generateXML(vat, lastVat, sequenceID) {
  let lat = ((45.339261 * 1000000 - 100) + Math.round(Math.random() * 200)) / 1000000;
  let long = ((11.880813 * 1000000 - 100) + Math.round(Math.random() * 200)) / 1000000;
  return `<?xml version='1.0' encoding='utf-8'?>
  <p:DatiCorrispettivi xmlns:p='http://ivaservizi.agenziaentrate.gov.it/docs/xsd/corrispettivi/dati/v1.0' versione='COR10' simulazione='true'>
    <Trasmissione>
      <Progressivo>${sequenceID}</Progressivo>
      <Formato>COR10</Formato>
      <Dispositivo>
        <Tipo>DA</Tipo>
        <IdDispositivo>0451093028410128539</IdDispositivo>
        <GeoLocalizzazione>
          <Lat>${lat.toFixed(6)}</Lat>
          <Long>${long.toFixed(6)}</Long>
        </GeoLocalizzazione>
      </Dispositivo>
    </Trasmissione>
    <DataOraRilevazione>${moment(vat.date).format('YYYY-MM-DDTHH:mm:ss')}</DataOraRilevazione>
    <DatiDA>
      <Periodo>
        <Venduto>${vat.amount.toFixed(2)}</Venduto>
        <VendutoContante>${vat.amount.toFixed(2)}</VendutoContante>
        <VendutoNoContante>0.00</VendutoNoContante>
        <Incassato>${vat.amount.toFixed(2)}</Incassato>
        <IncassatoRicarica>0.00</IncassatoRicarica>
        <IncassatoVendita>${vat.amount.toFixed(2)}</IncassatoVendita>
        <TotaleResoTubiResto>0.00</TotaleResoTubiResto>
        <TotaleCaricatoTubiResto>0.00</TotaleCaricatoTubiResto>
        <TotaleResoManualeTubiResto>0.00</TotaleResoManualeTubiResto>
        <TotaleCaricatoManualeTubiResto>0.00</TotaleCaricatoManualeTubiResto>
        <DataOraPrelievoPrec>${lastVat ? moment(lastVat.date).format('YYYY-MM-DDTHH:mm:ss') : '2018-03-19T18:45:01'}</DataOraPrelievoPrec>
        <ProgressivoPrelievo>0</ProgressivoPrelievo>
      </Periodo>
    </DatiDA>
  </p:DatiCorrispettivi>`;
}

var Vat = mongoose.model('Vat', VatSchema);
module.exports = Vat;
