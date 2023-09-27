import React from 'react';
import styles from './response.module.css';

interface ageComponentProps {
	day: number,
	month: number,
	age: number,
}
const Response = ({ day, month, age }: ageComponentProps) => {
	return (
		<>
			<h1><span className={styles.numbers}>{age == 0 ? "--" : age}</span> years</h1>
			<h1><span className={styles.numbers}>{month == 0 ? "--" : month}</span> months</h1>
			<h1><span className={styles.numbers}>{day == 0 ? "--" : day}</span> days</h1>
		</>
	)
}

export default Response