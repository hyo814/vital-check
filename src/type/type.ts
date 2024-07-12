export interface ScreeningData {
	type: string;
	value: number;
}

export interface PatientProps {
	id: number;
	name: string;
	sex: string;
	age: number;
	emr_id: number;
	doctor: string;
	admission_dt: string;
	status: string;
	location: string;
	department: string;
	alert: {
		type: string;
		value: number;
		date: string;
	};
	screening_data: ScreeningData[];
	sbp: number;
	dbp: number;
	pr: number;
	rr: number;
	bt: number;
}

export type Order = 'asc' | 'desc' | 'none';
