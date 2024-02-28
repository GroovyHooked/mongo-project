const { createCollections } = require('./model');
const { migrationScript } = require('./migration');
const { aggregationScript } = require('./aggregation');

module.exports.createCollections = createCollections;

module.exports.migrationScript = migrationScript;

module.exports.aggregationScript = aggregationScript;
