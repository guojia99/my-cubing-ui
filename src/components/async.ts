export class WaitGroup {
    private current = 0
    private queued: (() => void)[] = []

    private queue (fn: () => void) {
        if (this.current === 0) {
            fn()
            return
        }
        this.queued.push(fn)
    }

    private resolveQueue () {
        while (this.queued.length > 0) {
            this.queued.shift()?.()
        }
    }

    public add (delta: number = 1): void {
        this.current += delta
        if (this.current < 0) {
            throw new Error('negative cur numbers are not allowed')
        }
        if (this.current === 0) {
            this.resolveQueue()
        }
    }

    public done (): void {
        this.add(-1)
    }

    public wait (): Promise<void> {
        return new Promise((resolve) => {
            this.queue(() => resolve())
        })
    }
}