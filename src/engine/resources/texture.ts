import { Resource } from './resource';

export class Texture implements Resource {

    public image: HTMLImageElement
    private promise: Promise<void>

    constructor(url: string) {
        this.image = new Image();
        this.image.src = url;
    }

    async load(): Promise<void> {
        if (this.promise) {
            return this.promise;
        }

        this.promise = new Promise((resolve, reject) => {
            if (this.image.complete) {
                resolve();
                return;
            }

            this.image.onload = () => {
                resolve();
            };
            this.image.onerror = (e) => reject(e);
        });
    }

}