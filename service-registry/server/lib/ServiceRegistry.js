const semver = require('semver');

class ServiceRegistry {
    constructor(log) {
        this.log = log;
        this.services = {};
        this.timeout = 30;
    }

    get(name, version) {
        this.cleanup();
        const cands = Object.values(this.services)
            .filter(service => service.name === name && semver.satisfies(service.version, version));
        return cands[Math.floor(Math.random() * cands.length)];
    }

    register(name, version, ip, port) {
        this.cleanup();
        const key = name + version + ip + port;
        // Add service if it doesn't exist
        if (!this.services[key]) {
            this.services[key] = {};
            this.services[key].ip = ip;
            this.services[key].name = name;
            this.services[key].port = port;
            // Unix timestamp in seconds
            this.services[key].timestamp = Math.floor(new Date() / 1000);
            this.services[key].version = version;
            this.log.debug(`Added service "${name}", version ${version} at ${ip}:${port}`);
            return key;
        }
        // Otherwise, update the timestamp of the service
        this.log.debug(`Updated service "${name}", version ${version} at ${ip}:${port}`);
        return key;
    }

    unregister(name, version, ip, port) {
        const key = name + version + ip + port;
        delete this.services[key];
        return key;
    }

    cleanup() {
        const now = Math.floor(new Date() / 1000);
        Object.keys(this.services).forEach((key) => {
            if (this.services[key].timestamp + this.timeout < now) {
                delete this.services[key];
                this.log.debug(`Removed service ${key}`);
            }
        });
    }
}

module.exports = ServiceRegistry;