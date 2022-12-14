
exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if(err && 'EBADCSRFTOKEN' === err.code) {
        return res.send('ERRO! Envio de formulário suspeito.');
    } // Caso o envio do fomulário não tenha a senha do csrf iara dar uma mensagem de erro,
};

exports.csrfMiddleware = (req, res, next) => {
   res.locals.csrfToken = req.csrfToken();
   next(); // Se o envio do formulário tiver a senha do csrf, irá permitir o envio do mesmo.
};