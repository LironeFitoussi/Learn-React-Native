export class Place {
    constructor(
        public id: string = new Date().toISOString(),
        public title: string,
        public imageUri: string,
        public address: string,
        public location: { lat: number, lng: number }
    ) {}
}