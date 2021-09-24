const express = require('express');
const app = new express();
const dotenv = require('dotenv');
const cors_app = require('cors');
app.use(cors_app());
app.use(express.static('client'))

dotenv.config();

let api_key = process.env.API_KEY;
let api_url = process.env.API_URL;



function getNLUInstance() {
	
	const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
	const { IamAuthenticator } = require('ibm-watson/auth');

	const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
		version: '2020-08-01',
		authenticator: new IamAuthenticator({
			apikey: api_key,
		}),
		serviceUrl: api_url,
	})

	return naturalLanguageUnderstanding;
}



app.get("/", (req, res) => {
	res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
	const nlu = getNLUInstance();
	nlu.analyze({
		url: req.query.url,
		features: { emotion: {} },
	}).then((response) => {
		if (response.result && response.result.emotion && response.result.emotion.document) {
			return res.send(response.result.emotion.document.emotion);
		}
		res.send({ "happy": "0", "sad": "0" })
	}).catch(() => {
		res.send({ "happy": "0", "sad": "0" })
	});
});

app.get("/url/sentiment", (req, res) => {
	const nlu = getNLUInstance();
	nlu.analyze({
		url: req.query.url,
		features: { sentiment: {} },
	}).then((response) => {
		console.log(response.result.sentiment);
		if (response.result && response.result.sentiment && response.result.sentiment.document) {
			return res.send(response.result.sentiment.document);
		}
		res.send({ "happy": "0", "sad": "0" })
	}).catch(() => {
		res.send({ "happy": "0", "sad": "0" })
	});
});

app.get("/text/emotion", (req, res) => {
	const nlu = getNLUInstance();
	nlu.analyze({
		text: req.query.text,
		features: { emotion: {} },
	}).then((response) => {
		if (response.result && response.result.emotion && response.result.emotion.document) {
			return res.send(response.result.emotion.document.emotion);
		}
		res.send({ "happy": "0", "sad": "0" })
	}).catch(() => {
		res.send({ "happy": "0", "sad": "0" })
	});
});

app.get("/text/sentiment", (req, res) => {
	const nlu = getNLUInstance();
	nlu.analyze({
		text: req.query.text,
		features: { sentiment: {} },
	}).then((response) => {
		if (response.result && response.result.sentiment && response.result.sentiment.document) {
			return res.send(response.result.sentiment.document);
		}
		res.send({ "happy": "0", "sad": "0" })
	}).catch(() => {
		res.send({ "happy": "0", "sad": "0" })
	});
});

let server = app.listen(8080, () => {
	console.log('Listening', server.address().port)
})