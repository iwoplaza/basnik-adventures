import { Resource } from './resources/resource';

export class Sound implements Resource {
    
    private audio: HTMLAudioElement
    
    constructor(url: string) {
        this.audio = new Audio(url);
    }

    public initForMobilePlay(): void {
        this.audio.play();
        this.audio.pause();
    }

    public load(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!isNaN(this.audio.duration)) {
                resolve();
                return;
            }

            this.audio.addEventListener('load', () => {
                resolve();
            });

            this.audio.addEventListener('error', (e) => {
                reject(e);
            });
        });
    }

    public play(): void {
        this.audio.play();
    }

}