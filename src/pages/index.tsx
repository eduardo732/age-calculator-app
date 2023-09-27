import styles from "./index.module.css";
import { useState } from "react";
import Response from "../components/Response";
import FormContainer from "../components/FormContainer";

export default function Home() {
  const [age, setAge] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);

  

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
            <FormContainer
              calculateAge={calculateAge}
            />
          </section>
          <section className={styles.result}>
            <Response
              day={day}
              month={month}
              age={age}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
