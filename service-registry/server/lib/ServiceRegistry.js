class ServiceRegistry {
    constructor(log) {
        this.log = log;
        this.services = {};
        this.timeout = 30;
    }

    register(name, version, ip, port) {
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
}

module.exports = ServiceRegistry;