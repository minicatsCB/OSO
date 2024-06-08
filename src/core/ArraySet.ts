export class ArraySet<T> {
    private set: Set<string>;

    constructor() {
        this.set = new Set<string>();
    }

    add(arr: T): void {
        const key = JSON.stringify(arr);
        this.set.add(key);
    }

    has(arr: T): boolean {
        const key = JSON.stringify(arr);
        return this.set.has(key);
    }

    delete(arr: T): boolean {
        const key = JSON.stringify(arr);
        return this.set.delete(key);
    }

    clear(): void {
        this.set.clear();
    }

    size(): number {
        return this.set.size;
    }

    values(): Array<T> {
        return Array.from(this.set).map((key) => JSON.parse(key));
    }
}