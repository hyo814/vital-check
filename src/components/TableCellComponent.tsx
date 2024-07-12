import React from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import Image from 'next/image';
import CopyIcon from "../../public/assets/icon/icon-copy.svg";
import { PatientProps } from '../type/type';
import { roundToOne, getStatusClass } from '../utils/utils';

interface TableCellComponentProps {
	patient: PatientProps;
	lastPatientRef: any;
	isLast: boolean;
}

const TableCellComponent: React.FC<TableCellComponentProps> = ({ patient, lastPatientRef, isLast }) => (
	<TableRow ref={isLast ? lastPatientRef : null} key={patient.id} className="hover:bg-blue1">
		<TableCell>
			<div className={getStatusClass(patient.status)}>{patient.status}</div>
		</TableCell>
		<TableCell>{`${patient.name} (${patient.sex}/${patient.age})`}<br/>{`${patient.emr_id}`}</TableCell>
		<TableCell>
			<IconButton onClick={() => navigator.clipboard.writeText(patient.emr_id.toString())}>
				<Image src={CopyIcon} alt="copy icon" width={24} height={24}/>
			</IconButton>
		</TableCell>
		<TableCell>{patient.location}<br/>{patient.admission_dt}</TableCell>
		<TableCell className="border-r border-gray-300 last:border-r-0">{patient.department}<br/>{patient.doctor}</TableCell>
		<TableCell>{patient.alert.type}<br/>{patient.alert ? roundToOne(patient.alert.value) : 'N/A'}</TableCell>
		<TableCell className="border-r border-gray-300 last:border-r-0">{patient.alert.date}</TableCell>
		<TableCell>{patient.sbp}</TableCell>
		<TableCell>{patient.dbp}</TableCell>
		<TableCell>{patient.pr}</TableCell>
		<TableCell>{patient.rr}</TableCell>
		<TableCell>{patient.bt}</TableCell>
	</TableRow>
);

export default TableCellComponent;
