import { Form, Formik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import InputContainer from './InputContainer';
import styles from './form.module.css';
import Image from 'next/image';

interface FormProps {
	calculateAge: (day: string, month: string, year: string) => void
}

const FormContainer = ({ calculateAge }: FormProps) => {
	const initialValues = {
    day: '',
    month: '',
    year: '',
  }

  const validationSchema = Yup.object().shape({
    day: Yup.number()
      .required('This field is required')
      .min(1, 'Must be a valid day')
      .max(31, 'Must be a valid day'),
    month: Yup.number()
      .required('This field is required')
      .min(1, 'Must be a valid month')
      .max(12, 'Must be a valid month'),
    year: Yup.number()
      .required('This field is required')
      .max(new Date().getFullYear(), 'Must be in the past')
  })
	const onCalculateAge = (day: string, month: string, year: string) => {
		calculateAge(day, month, year)
	}
	return (
		<Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) =>
                onCalculateAge(values.day, values.month, values.year)
              }
            >
              <Form className={styles.form}>
                <InputContainer
                  id="day"
                  ph="DD"
                />
                <InputContainer
                  id="month"
                  ph="MM"
                />
                <InputContainer
                  id="year"
                  ph="YYYY"
                />
                <div className={styles.btnContainer}>
                  <div className={styles.btnHr}></div>
                  <button type="submit" className={styles.btn}>
                    <Image
                      src="/icons/icon-arrow.svg"
                      className={styles.img}
                      alt=""
                      height={50}
                      width={50}
                    />
                  </button>
                </div>
              </Form>
            </Formik>
	)
}

export default FormContainer