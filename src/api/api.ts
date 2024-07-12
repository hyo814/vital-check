import axios from 'axios';
import { PatientProps } from '../type/type';
import { formatPatientData } from '../utils/utils';

export const fetchPatients = async ({ pageParam = 1 }) => {
	const result = await axios.get<PatientProps[]>(`http://localhost:4000/screening?_page=${pageParam}&_limit=5`);
	return result.data.map(formatPatientData);
};
