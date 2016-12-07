/**
 * Created by derek1117 on 2/12/16.
 */
var env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
    var config = require('./config.json');
    var envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}
//# sourceMappingURL=config.js.map