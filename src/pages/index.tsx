import { Field, Form, Formik } from "formik";
import styles from "./index.module.css";
import { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";

export default function Home() {
  const [age, setAge] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);

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

  const calculateAge = (day: string, month: string, year: string) => {
    const today = new Date();
    const birthDate = new Date(Number(year), Number(month) - 1, Number(day)); // month is 0-based
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDay();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      setAge(age - 1);
    }

    setAge(age);
    setMonth(monthDiff);
    setDay(dayDiff);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.container}>
          <section className={styles.formSection}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) =>
                calculateAge(values.day, values.month, values.year)
              }
            >
              <Form className={styles.form}>
                <div className={styles.inputContainer}>
                  <label htmlFor="day">DAY</label>
                  <Field
                    type="number"
                    id="day"
                    name="day"
                    className={styles.input}
                    placeholder="DD"
                  />

                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="month">MONTH</label>
                  <Field
                    type="number"
                    id="month"
                    name="month"
                    className={styles.input}
                    placeholder="MM"
                  />

                </div>
                <div className={styles.inputContainer}>
                  <label htmlFor="year">YEAR</label>
                  <Field
                    type="number"
                    id="year"
                    name="year"
                    className={styles.input}
                    placeholder="YYYY"
                  />
                </div>
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
          </section>
          <section className={styles.result}>
            <h1><span className={styles.numbers}>{age == 0 ? "--" : age}</span> years</h1>
            <h1><span className={styles.numbers}>{month == 0 ? "--" : month}</span> months</h1>
            <h1><span className={styles.numbers}>{day == 0 ? "--" : day}</span> days</h1>
          </section>
        </div>
      </div>
    </div>
  );
}
