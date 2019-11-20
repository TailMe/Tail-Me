const axios = require('axios');

class CircuitBreaker {
    constructor() {
        this.states = {};
        this.failureThreshold = 5;
        this.cooldownPeriod = 10;
        this.requestTimeout = 1;
    }
    
    initState(endpoint) {
        this.state[endpoint] = {
            failures: 0,
            cooldownPeriod: this.cooldownPeriod,
            circuit: 'CLOSED',
            nextTry: 0
        };
    }
}
module.exports = CircuitBreaker;