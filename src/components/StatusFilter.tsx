import React from 'react';
import { Checkbox } from '@mui/material';

interface StatusFilterProps {
	filterStatus: string[];
	handleStatusChange: (status: string) => void;
	statusCounts: { [key: string]: number };
}

const StatusFilter: React.FC<StatusFilterProps> = ({ filterStatus, handleStatusChange, statusCounts }) => (
	<div>
		<span>&nbsp;전체 ({statusCounts['전체'] || 0}){" "}|{" "}</span>
		{['신규', '관찰 중', '오류', '완료', 'DNR'].map(status => (
			<span key={status}>
				<label>
					<Checkbox
						checked={filterStatus.includes(status)}
						onChange={() => handleStatusChange(status)}
					/>
					{status} ({statusCounts[status] || 0})
				</label>
			</span>
		))}
	</div>
);

export default StatusFilter;
