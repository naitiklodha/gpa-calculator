import { useState } from "react";
import { Inter } from "next/font/google";
import SubjectForm from "@/components/subjectForm";
import Table from "@/components/table";
import Head from "next/head";
import CalculatePoints from "@/components/calculatePoints";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [GPA, setGPA] = useState();

  const [subject, setSubject] = useState({
    name: "",
    credit: "",
    ica: "",
    tee: "",
  });

  const addSubject = () => {
    if (subject.name == "" || subject.ica == "") {
      alert("Please fil out the compulsory fields");
    } else if (subject.ica > 50 || subject.tee > 100) {
      alert("Please enter valid marks");
    } else {
      let total = 0;

      total = Math.round(subject.tee / 2 + subject.ica);
      if (subject.tee === 0 || subject.tee === "") {
        total *= 2;
      }

      const { grade, point } = CalculatePoints(subject, total);
      const newSubject = {
        name: subject.name,
        credit: subject.credit,
        ica: subject.ica,
        tee: subject.tee,
        total,
        grade,
        point,
      };

      setSubjects((current) => [...current, newSubject]);
      setSubject({ name: "", credit: "", ica: "", tee: "" });
    }
  };
  const onDelete = (subj) => {
    const updatedSubjects = subjects.filter((s) => s.name !== subj.name);
    setSubjects(updatedSubjects);
    setGPA(null);
  };
  const calculateGPA = () => {
    let total = 0;
    let totalCredits = 0;
    subjects.forEach((sub) => {
      total = total + sub.credit * sub.point;
      totalCredits = totalCredits + sub.credit;
    });
    let GPA = total / totalCredits;
    GPA = GPA.toFixed(2);
    setGPA(GPA);
  };
  return (
    <>
      <Head>
        <title>GPA Calculator</title>
        <meta
          name="google-site-verification"
          content="dlkM9uq8vriBaZ1483qLaZ-6rRmAPY3FI6wD_XBMAkY"
        />
        <meta
          name="description"
          content="Naitik Lodha's  GPA calculator is a useful tool that helps students calculate their Grade Point Average (GPA) on a 4-point scale. Simply input your grades and credit hours, and the calculator will do the rest, giving you an accurate calculation of your GPA. Try it out today and streamline your academic planning!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="keywords"
          content="HTML,CSS,GPA Calculator,Next.js,GPA Calculator(on 4 point scale)"
        />
        <meta name="author" content="Naitik Lodha" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:image"
          content="https://cdn.sanity.io/images/qfp763lg/production/8619ed9caef4b15757c4577925b5e56ee74f1d0b-1366x659.png"
        />

        <meta property="og:title" content="GPA Calculator" />

        <meta
          property="og:description"
          content="Naitik Lodha's  GPA calculator is a useful tool that helps students calculate their Grade Point Average (GPA) on a 4-point scale. Simply input your grades and credit hours, and the calculator will do the rest, giving you an accurate calculation of your GPA. Try it out today and streamline your academic planning!"
        />
      </Head>
      <main
        className={`flex bg-ash text-center min-h-screen w-full text-seagreen  flex-col items-center  p-24 ${inter.className}`}
      >
        <h1 className="font-bold text-4xl ">GPA Calculator</h1>
        {GPA ? (
          <div className="text-white mt-2">
            Your GPA is :<br />
            <h1 className="text-5xl mt-4 animate-pulse text-seagreen">{GPA}</h1>
          </div>
        ) : (
          <></>
        )}

        <SubjectForm
          subject={subject}
          setSubject={setSubject}
          addSubject={addSubject}
        />

        {subjects.length ? (
          <>
            <Table subjects={subjects} onDelete={onDelete} />
            <button
              className="bg-seagreen mt-4 rounded-md font-semibold text-smoke p-2"
              onClick={calculateGPA}
            >
              Calculate GPA!
            </button>
          </>
        ) : (
          <></>
        )}
      </main>
      <Footer style={inter.className} />
    </>
  );
}
