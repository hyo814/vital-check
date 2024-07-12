import React from 'react';
import Image from 'next/image';
import UpIcon from '../../public/assets/icon/icon-state_up.svg';
import NoneIcon from '../../public/assets/icon/icon-state_none.svg';
import DownIcon from '../../public/assets/icon/icon-state_down.svg';

interface SortIconProps {
	orderBy: string;
	property: string;
	order: string;
}

const SortIcon: React.FC<SortIconProps> = ({ orderBy, property, order }) => {
	if (orderBy === property) {
		if (order === 'asc') {
			return <Image src={UpIcon} alt="up" width={24} height={24} />;
		} else if (order === 'desc') {
			return <Image src={DownIcon} alt="down" width={24} height={24} />;
		}
	}
	return <Image src={NoneIcon} alt="none" width={24} height={24} />;
};

export default SortIcon;
