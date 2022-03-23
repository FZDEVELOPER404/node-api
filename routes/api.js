const express = require('express');
const hx = require('hxz-api');
const fs = require('fs-extra');
const util = require('minecraft-server-util');
const options = {
    timeout: 1000 * 5,
    enableSRV: true // SRV record lookup
};
const router = express.Router();
const { cekKey } = require('../database/db'); 
const { youtubePlay, youtubeMp4, youtubeMp3 } = require('../controllers/yt');
const { cakLontong, bijak, quotes, fakta, ptl, motivasi } = require('../controllers/randomtext');

// akhir cekapi
router.get('/cekapi', async (req, res) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silahkan anda login/register untuk mendapatkan api fadlyapi.herokuapp.com`
    });
    res.send({status: 200, apikey: apikey, limit: '900 limit', note: 'apikey aktif, silahkan gunakan restapinya'});
});
// akhir cekapi
// minecraft
router.get('/minecraft', async (req, res) => {
    const apik = req.query.ipaddress;
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    util.status(apik, 25565, options)
    .then((result) =>
    res.json(result
))
});
// akhir minecraft
// lirik
router.get('/lirik', async (req, res) => {
    const judul = req.query.search;
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.lirik(judul)
    .then(result => {
     res.json(result)
})
});
// akhir lirik
// igstalk
router.get('/igstalk', async (req, res) => {
    const username = req.query.username;
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

hx.igstalk(username)
    .then(result => {
    res.json(result)
})
});
//akhir igstalk
// pinterest
router.get('/pinterest', async (req, res) => {
    const judul = req.query.query;
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });

    hx.pinterest(judul)
    .then(result => {
     res.json(result)
})
});
// akhir pinterest
// tiktok
router.get('/tiktok', async (req, res) => {
    const link = req.query.url;
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    hx.ttdownloader(link)
    .then(result => {
    res.json(result)
})
});
// akhir tiktok
//modul internal
router.get('/ytplay', youtubePlay);

router.get('/ytmp4', youtubeMp4);

router.get('/ytmp3', youtubeMp3);

router.get('/caklontong', cakLontong);

router.get('/quotes', quotes);

router.get('/fakta', fakta);

router.get('/bijak', bijak);

router.get('/ptl', ptl);

router.get('/motivasi', motivasi);

module.exports = router;
