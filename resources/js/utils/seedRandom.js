import seedrandom from 'seedrandom';

class SeedRandom {
    constructor(seed) {
        this.setSeed(seed);
    }

    setSeed(seed) {
        this.currentSeed = seed;
        this.rng = seedrandom(seed);
    }

    generateRandomSeed() {
        return Math.random().toString(36).substring(2, 15);
    }

    random() {
        return this.rng();
    }

    randomInt(min, max) {
        return Math.floor(this.random() * (max - min + 1)) + min;
    }

    randomFloat(min, max) {
        return this.random() * (max - min) + min;
    }

    getCurrentSeed() {
        return this.currentSeed;
    }

    reset() {
        this.rng = seedrandom(this.currentSeed);
    }
}

export const seedRandom = new SeedRandom();
