var express = require('express');
var router = express.Router();
var Admin={
  usuario:"Administrador",
  password:"1234"
};




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login_admin.jade', { title: 'Login' });

});

router.post('/entrar', function(req, res, next) {
 //res.render('admin');
	if(req.body.usuario == Admin.usuario && req.body.clave == Admin.password)
	{
		
		  res.render('index', { title: 'Nutrinaycen' });
	}
	else
	{

		res.render('login_admin.jade', { title: 'Login' });
	}
});

router.get('/cliente', function(req, res, next) {
  res.render('index', { title: 'Admi_Cliente' });

});

router.get('/nutricionista', function(req, res, next) {
  res.render('index_nutricionista', { title: 'Admin_Nutricionista' });

});

router.get('/coach', function(req, res, next) {
  res.render('index_coach', { title: 'Admin_Coach' });

});


router.get('/cerrar', function(req, res, next) {
	res.render('login_admin.jade', { title: 'Login' });
});


router.get('/dieta', function(req, res, next) {
  res.render('dieta.jade', { title: 'Nutricionista' });

});

module.exports = router;
