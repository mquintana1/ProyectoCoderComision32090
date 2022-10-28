const infoController = (req, res) => {
    console.log(process.PWD)
    res.json({
        'Argumentos de entrada': process.argv,
        'Sistema operativo': process.env.OS,
        'Version de Nodejs': process.version,
        'Memoria total reservada': process.memoryUsage().rss,
        'Path de ejecucion': process.execPath,
        'Id del proceso': process.pid,
        'Carpeta del proyecto': process.cwd(),
    });
};

export default infoController