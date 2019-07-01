export class Info{
    id: number;
    title: string;
    content: string;
    country: string;
    
	constructor(_id: number, _title: string, _content: string, _country: string) {
        this.id = _id;
        this.title = _title;
        this.content = _content;
        this.country = _country;
	}	
}