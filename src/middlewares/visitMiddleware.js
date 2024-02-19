export const setLastVisit = (req, res, next) => {
    if (req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    else {
        res.cookie('lastVisit', new Date().toISOString(), {
            maxAge: 365 * 24 * 60 * 60 * 1000
        })
    }

    next();
}