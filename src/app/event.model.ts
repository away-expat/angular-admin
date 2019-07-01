export class Event{
    id: number;
    name: string;
    date: string;
    hour: string;
    promoted: boolean;
    description: string;
    activityName: string;
    activityId: number;
    photo: string;
    
	constructor(_id: number, _name: string, _date: string, _hour: string, _promoted: boolean, _description: string, _activityName: string, _activityId: number, _photo: string) {
        this.id = _id;
        this.name = _name;
        this.date = _date;
        this.hour = _hour;
        this.promoted = _promoted;
        this.description = _description;
        this.activityName = _activityName;
        this.activityId = _activityId;
        this.photo = _photo;

	}	
}
