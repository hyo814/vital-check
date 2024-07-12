import {PatientProps} from "@/src/type/type";
import {convertStatus} from "@/src/utils/utils";

export const usePatientStatusCounts = (patients: PatientProps[]) => {
	const counts = patients.reduce((acc, patient) => {
		const status = convertStatus(patient.status);
		acc[status] = (acc[status] || 0) + 1;
		return acc;
	}, {} as { [key: string]: number });
	
	counts['전체'] = patients.length;
	return counts;
}
