export class City{
    id: number;
    name: string;
    country: string;
    place_id: string;
    location: string;
    countryCode: string;
    
	constructor(_id: number, _name: string, _country: string, _place_id: string, _location: string, _countryCode: string) {
        this.id = _id;
        this.name = _name;
        this.country = _country;
        this.place_id = _place_id;
        this.location = _location;
        this.countryCode = _countryCode;
	}	
}