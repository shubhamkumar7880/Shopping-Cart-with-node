exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, "Views", "404.html"));
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: null });
}