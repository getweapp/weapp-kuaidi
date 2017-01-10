/*
* 作者：刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

// api服务
const Restify = require('restify')
const Server = Restify.createServer()
Server.use(Restify.queryParser())
Server.use(Restify.bodyParser())

// request
const request = require('request')
// md5
const md5 = require('MD5')

// 快递鸟（kdniao.com）应用参数
const EBusinessID = '1274179'
const AppKey = '911daebb-b74a-42c0-8d37-7391d2583051'

// 快递鸟api接口
const url = 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx'

// 监听端口号
const PORT = 5301


/********** 业务处理开始 **********/

// 获取快递公司编号
Server.get('/searchShippers', (req, res) => {
	const data = req.query
	if(!data.LogisticCode){
		res.send({
			code: 1,
			message: '缺少参数：LogisticCode'
		})
		return
	}
	const RequestData = JSON.stringify({LogisticCode: data.LogisticCode})
	request({
		url: url,
		method: 'POST',
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form:{
			RequestData: encodeURI(RequestData),
			EBusinessID: EBusinessID,
			RequestType: '2002',
			DataSign: encodeURI(new Buffer(md5(RequestData+AppKey)).toString('base64')),
			DataType: '2',
			LogisticCode: data.LogisticCode
		}
	}, (err, response, body) => {
		if(err || response.statusCode != 200){
			res.send({
				code: 1,
				message: '服务器故障'
			})
		}
		const data = JSON.parse(body)
		res.send({
			code: 0,
			data: data
		})
	})

})

// 获取快递详情
Server.get('/search', (req, res) => {
	const data = req.query
	if(!data.ShipperCode){
		res.send({
			code: 1,
			message: '缺少参数：ShipperCode'
		})
		return
	}else if(!data.LogisticCode){
		res.send({
			code: 1,
			message: '缺少参数：LogisticCode'
		})
		return
	}

	const RequestData = JSON.stringify({ShipperCode: data.ShipperCode, LogisticCode: data.LogisticCode})

	request({
		url: url,
		method: 'POST',
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		form:{
			RequestData: encodeURI(RequestData),
			EBusinessID: EBusinessID,
			RequestType: '1002',
			DataSign: encodeURI(new Buffer(md5(RequestData+AppKey)).toString('base64')),
			DataType: '2',
			ShipperCode: data.ShipperCode,
			LogisticCode: data.LogisticCode
		}
	}, (err, response, body) => {
		if(err || response.statusCode != 200){
			res.send({
				code: 1,
				message: '服务器故障'
			})
		}
		const data = JSON.parse(body)
		res.send({
			code: 0,
			data: data
		})
	})
})

/********** 业务处理结束 **********/

// 监听端口开启api服务
Server.listen(PORT, () => {
	console.log('开启服务器，端口号：', PORT)
})
