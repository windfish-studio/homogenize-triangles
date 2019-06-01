module.exports = function (_n, sigFigs) {
    const p = Math.pow(10,sigFigs);
    if(_n === -0)
        return 0;
    return (Math.floor(Math.round(_n*p)) / p)
};