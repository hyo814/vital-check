import {PatientProps} from "@/src/type/type";

export const roundToOne = (num: number) => {
	return Math.round(num * 10) / 10;
}

export const convertStatus = (oldStatus: string) => {
	switch (oldStatus) {
		case 'SCREENED':
			return '신규';
		case 'OBSERVING':
			return '관찰 중';
		case 'DONE':
			return '완료';
		case 'ERROR':
			return '오류';
		case 'DNR':
			return 'DNR';
		default:
			return oldStatus;
	}
}

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
		.getDate()
		.toString()
		.padStart(2, '0')}`;
	return formattedDate;
}

export const formatAlertDate = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
		.getDate()
		.toString()
		.padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
	return formattedDate;
}

export const formatPatientData = (patient: PatientProps) => ({
	...patient,
	status: convertStatus(patient.status),
	admission_dt: formatDate(patient.admission_dt),
	sbp: Math.round(patient.screening_data.find((d) => d.type === 'SBP')?.value || 0),
	dbp: Math.round(patient.screening_data.find((d) => d.type === 'DBP')?.value || 0),
	pr: Math.round(patient.screening_data.find((d) => d.type === 'PR')?.value || 0),
	rr: Math.round(patient.screening_data.find((d) => d.type === 'RR')?.value || 0),
	bt: Math.round(patient.screening_data.find((d) => d.type === 'BT')?.value || 0),
	alert: patient.alert ? { ...patient.alert, date: formatAlertDate(patient.alert.date) } : undefined
});

export const getStatusClass = (status: string) => {
	switch (status) {
		case '완료':
			return 'bg-done_bg text-done_text text-center align-middle';
		case '신규':
			return 'bg-screened_bg text-screened_text text-center align-middle';
		case '관찰 중':
			return 'bg-observing_bg text-observing_text text-center align-middle';
		case '오류':
			return 'bg-error_bg text-error_text text-center align-middle';
		case 'DNR':
			return 'bg-dnr_bg text-dnr_text text-center align-middle';
		default:
			return 'text-center align-middle';
	}
};
