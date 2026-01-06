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

// export const seedRandom = new SeedRandom();
export const popupsRandom = new SeedRandom();
export const thermoRandom = new SeedRandom();
export const calendarRandom = new SeedRandom();
export const customerRandom = new SeedRandom();