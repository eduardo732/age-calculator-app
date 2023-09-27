import React from 'react'
import styles from './inputContainer.module.css'
import { Field } from 'formik'

interface InputContainerProps {
	id: string,
	ph: string,
}
const InputContainer = ({ id, ph}: InputContainerProps) => {
	return (
		<div className={styles.inputContainer}>
			<label htmlFor={id}>{id.toUpperCase()}</label>
			<Field
				type="number"
				id={id}
				name={id}
				className={styles.input}
				placeholder={ph}
			/>

		</div>
	)
}

export default InputContainer