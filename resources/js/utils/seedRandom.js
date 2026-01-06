import seedrandom from 'seedrandom';

class SeedRandom {
    constructor(seed) {
        this.setSeed(seed);
    }

    setSeed(seed) {
        this.currentSeed = seed;
        this.rng = seedrandom(seed);
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
}

export const seedRandom = new SeedRandom();
